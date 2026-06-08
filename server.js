const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { Kafka, logLevel } = require('kafkajs');

// MongoDB / Mongoose Connector
const {
  connectMongoDB,
  User,
  Post,
  Comment,
  Like,
  Task,
  Poll
} = require('./mongoose');

const mongoURI = process.env.MONGODB_URI;
let useMongo = false;

// Kafka Configuration & Fallback Engine
let kafkaEnabled = false;
let kafkaProducer = null;

const kafka = new Kafka({
  clientId: 'aegis-app',
  brokers: ['localhost:9092'],
  connectionTimeout: 1000,
  requestTimeout: 1000,
  logLevel: logLevel.NOTHING,
  retry: {
    initialRetryTime: 100,
    retries: 1
  }
});

const auditLogPath = path.join(__dirname, 'uploads', 'audit_trail.log');

function logEventToAuditTrail(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  try {
    fs.appendFileSync(auditLogPath, logLine, 'utf8');
  } catch (err) {
    console.error('Failed to write to audit log:', err.message);
  }
}

async function initKafka() {
  try {
    const producer = kafka.producer();
    await producer.connect();
    kafkaProducer = producer;
    kafkaEnabled = true;
    console.log('✓ Kafka Producer connected successfully.');

    const consumer = kafka.consumer({ groupId: 'aegis-group' });
    await consumer.connect();
    await consumer.subscribe({ topics: ['user-events', 'forum-events'], fromBeginning: false });
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        logEventToAuditTrail(`[Kafka Event - ${topic}]: ${value}`);
      }
    });
    console.log('✓ Kafka Consumer running and subscribed.');
  } catch (err) {
    console.warn('⚠ Kafka connection failed. Falling back to local audit streams.');
    kafkaEnabled = false;
  }
}

async function emitEvent(topic, data) {
  const payload = JSON.stringify(data);
  logEventToAuditTrail(`[Local Stream - ${topic}]: ${payload}`);

  if (kafkaEnabled && kafkaProducer) {
    try {
      await kafkaProducer.send({
        topic,
        messages: [{ value: payload }]
      });
    } catch (err) {
      console.error('Failed to emit Kafka event:', err.message);
    }
  }
}

initKafka();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'dist')));

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer Config for media uploads (images and videos)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Initialize SQLite database
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    createTables();
  }
});

// Password Hash function (client-side hash algorithm)
function hashPassword(plain) {
  var hash = 0;
  for (var i = 0; i < plain.length; i++) {
    var ch = plain.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash |= 0; // Convert to 32-bit integer
  }
  return 'h$' + Math.abs(hash).toString(36);
}

// Create schema and import default users
function createTables() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      avatar TEXT
    )`);

    // Posts table
    db.run(`CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL, -- 'text', 'image', 'video'
      content TEXT,
      media_url TEXT,
      created_at TEXT NOT NULL,
      likes_count INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Comments table
    db.run(`CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      post_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Likes table
    db.run(`CREATE TABLE IF NOT EXISTS likes (
      id TEXT PRIMARY KEY,
      post_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      UNIQUE(post_id, user_id),
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Tasks table
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'todo', -- 'todo', 'in_progress', 'done'
      assignee_id TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (assignee_id) REFERENCES users(id)
    )`);

    // Polls table
    db.run(`CREATE TABLE IF NOT EXISTS polls (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      options TEXT NOT NULL, -- JSON string array of options: ["Option A", "Option B"]
      votes TEXT NOT NULL, -- JSON object mapping index to vote count: {"0": 5, "1": 10}
      voted_users TEXT DEFAULT '[]', -- JSON array of user IDs who already voted
      created_at TEXT NOT NULL
    )`);

    // Sync users from js/data.js
    syncUsersFromDataJS();
  });
}

function syncUsersFromDataJS() {
  try {
    const dataJsPath = path.join(__dirname, 'js', 'data.js');
    if (!fs.existsSync(dataJsPath)) {
      console.warn('js/data.js not found. Skipping user synchronization.');
      return;
    }

    const dataCode = fs.readFileSync(dataJsPath, 'utf8');
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(dataCode, sandbox);
    const UniversityDB = sandbox.window.UniversityDB;

    if (!UniversityDB) {
      console.error('Failed to parse UniversityDB from js/data.js');
      return;
    }

    const faculty = UniversityDB.getFaculty();
    const students = UniversityDB.getStudents();

    // Insert Default Admin
    db.run(`INSERT OR REPLACE INTO users (id, name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?, ?)`, [
      'usr_001',
      'Dr. Evelyn Sterling',
      'admin@aegis.edu',
      hashPassword('admin123'),
      'admin',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    ]);

    // Insert Default Faculty demo account
    db.run(`INSERT OR REPLACE INTO users (id, name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?, ?)`, [
      'usr_002',
      'Prof. Marcus Chen',
      'faculty@aegis.edu',
      hashPassword('faculty123'),
      'faculty',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    ]);

    // Insert Default Student demo account
    db.run(`INSERT OR REPLACE INTO users (id, name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?, ?)`, [
      'usr_003',
      'Aria Nakamura',
      'student@aegis.edu',
      hashPassword('student123'),
      'student',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    ]);

    // Insert Faculty members
    faculty.forEach((fac) => {
      const parts = fac.name.trim().split(/\s+/);
      const lastName = parts[parts.length - 1];
      const cleanLastName = lastName.replace(/[^a-zA-Z0-9]/g, '');
      const plainPassword = `${cleanLastName}@${fac.id}`;

      db.run(`INSERT OR REPLACE INTO users (id, name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?, ?)`, [
        `usr_${fac.id.toLowerCase()}`,
        fac.name,
        fac.email,
        hashPassword(plainPassword),
        'faculty',
        fac.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
      ]);
    });

    // Insert Students
    students.forEach((stu) => {
      const parts = stu.name.trim().split(/\s+/);
      const firstName = parts[0];
      const cleanFirstName = firstName.replace(/[^a-zA-Z0-9]/g, '');
      const plainPassword = `${cleanFirstName}@${stu.id}`;

      db.run(`INSERT OR REPLACE INTO users (id, name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?, ?)`, [
        `usr_${stu.id.toLowerCase()}`,
        stu.name,
        stu.email,
        hashPassword(plainPassword),
        'student',
        stu.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
      ]);
    });

    console.log('Database users synced successfully.');
  } catch (error) {
    console.error('Error syncing users:', error);
  }
}

// -------------------------------------------------------------
// API ENDPOINTS
// -------------------------------------------------------------

// 1. Auth Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const hashedPassword = hashPassword(password);
  db.get(`SELECT id, name, email, role, avatar FROM users WHERE email = ? AND password = ?`, [email, hashedPassword], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error occurred.' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    emitEvent('user-events', { type: 'login', email: user.email, name: user.name, timestamp: new Date() });
    res.json({ success: true, user });
  });
});

// 2. Fetch Users
app.get('/api/users', (req, res) => {
  db.all(`SELECT id, name, email, role, avatar FROM users ORDER BY name ASC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Create User
app.post('/api/users', (req, res) => {
  const { id, name, email, role, password, avatar } = req.body;
  if (!id || !name || !email || !role) {
    return res.status(400).json({ error: 'id, name, email, and role are required.' });
  }
  const hashedPassword = hashPassword(password || 'aegis123');
  db.run(
    `INSERT INTO users (id, name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, name, email, hashedPassword, role, avatar || ''],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true });
    }
  );
});

// Update User
app.put('/api/users/:id', (req, res) => {
  const { name, email, avatar } = req.body;
  db.run(
    `UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), avatar = COALESCE(?, avatar) WHERE id = ?`,
    [name, email, avatar, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true });
    }
  );
});

// Delete User
app.delete('/api/users/:id', (req, res) => {
  db.run(`DELETE FROM users WHERE id = ?`, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

// 3. Fetch Posts (including their comments and likes status)
app.get('/api/posts', (req, res) => {
  const sql = `
    SELECT posts.*, users.name as user_name, users.avatar as user_avatar, users.role as user_role
    FROM posts 
    JOIN users ON posts.user_id = users.id 
    ORDER BY posts.created_at DESC
  `;
  db.all(sql, [], (err, posts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Fetch comments for all posts
    db.all(`
      SELECT comments.*, users.name as user_name, users.avatar as user_avatar 
      FROM comments 
      JOIN users ON comments.user_id = users.id 
      ORDER BY comments.created_at ASC
    `, [], (err, comments) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Fetch likes for all posts
      db.all(`SELECT * FROM likes`, [], (err, likes) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Map comments and likes to posts
        const postList = posts.map(post => {
          return {
            ...post,
            comments: comments.filter(c => c.post_id === post.id),
            likes: likes.filter(l => l.post_id === post.id).map(l => l.user_id)
          };
        });

        res.json(postList);
      });
    });
  });
});

// 4. Create Post
app.post('/api/posts', upload.single('media'), (req, res) => {
  const { user_id, content, type } = req.body;
  if (!user_id || !type) {
    return res.status(400).json({ error: 'user_id and type are required fields.' });
  }

  const id = 'post_' + Math.random().toString(36).substr(2, 9);
  const media_url = req.file ? `/uploads/${req.file.filename}` : null;
  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO posts (id, user_id, type, content, media_url, created_at, likes_count) VALUES (?, ?, ?, ?, ?, ?, 0)`,
    [id, user_id, type, content || '', media_url, created_at],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      emitEvent('forum-events', { type: 'post-create', post_id: id, user_id, type, timestamp: new Date() });
      res.json({ success: true, post_id: id });
    }
  );
});

// 5. Toggle Like
app.post('/api/posts/:id/like', (req, res) => {
  const post_id = req.params.id;
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required.' });
  }

  // Check if like exists
  db.get(`SELECT id FROM likes WHERE post_id = ? AND user_id = ?`, [post_id, user_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      // Unlike
      db.run(`DELETE FROM likes WHERE post_id = ? AND user_id = ?`, [post_id, user_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // Decrement likes count
        db.run(`UPDATE posts SET likes_count = MAX(0, likes_count - 1) WHERE id = ?`, [post_id], () => {
          emitEvent('forum-events', { type: 'like-toggle', post_id, user_id, liked: false, timestamp: new Date() });
          res.json({ liked: false });
        });
      });
    } else {
      // Like
      const like_id = 'like_' + Math.random().toString(36).substr(2, 9);
      db.run(`INSERT INTO likes (id, post_id, user_id) VALUES (?, ?, ?)`, [like_id, post_id, user_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        // Increment likes count
        db.run(`UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?`, [post_id], () => {
          emitEvent('forum-events', { type: 'like-toggle', post_id, user_id, liked: true, timestamp: new Date() });
          res.json({ liked: true });
        });
      });
    }
  });
});

// 6. Add Comment
app.post('/api/posts/:id/comments', (req, res) => {
  const post_id = req.params.id;
  const { user_id, content } = req.body;

  if (!user_id || !content) {
    return res.status(400).json({ error: 'user_id and content are required.' });
  }

  const comment_id = 'comment_' + Math.random().toString(36).substr(2, 9);
  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO comments (id, post_id, user_id, content, created_at) VALUES (?, ?, ?, ?, ?)`,
    [comment_id, post_id, user_id, content, created_at],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      emitEvent('forum-events', { type: 'comment-add', post_id, comment_id, user_id, timestamp: new Date() });
      res.json({ success: true, comment_id });
    }
  );
});

// 7. Fetch Tasks
app.get('/api/tasks', (req, res) => {
  db.all(
    `SELECT tasks.*, users.name as assignee_name, users.avatar as assignee_avatar 
     FROM tasks 
     LEFT JOIN users ON tasks.assignee_id = users.id 
     ORDER BY tasks.created_at DESC`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// 8. Create Task
app.post('/api/tasks', (req, res) => {
  const { title, description, assignee_id } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'title is required.' });
  }

  const id = 'task_' + Math.random().toString(36).substr(2, 9);
  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO tasks (id, title, description, status, assignee_id, created_at) VALUES (?, ?, ?, 'todo', ?, ?)`,
    [id, title, description || '', assignee_id || null, created_at],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, task_id: id });
    }
  );
});

// 9. Update Task Status
app.put('/api/tasks/:id', (req, res) => {
  const task_id = req.params.id;
  const { status } = req.body;

  if (!status || !['todo', 'in_progress', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  db.run(`UPDATE tasks SET status = ? WHERE id = ?`, [status, task_id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    emitEvent('forum-events', { type: 'task-status-update', task_id, status, timestamp: new Date() });
    res.json({ success: true });
  });
});

// 10. Fetch Polls
app.get('/api/polls', (req, res) => {
  db.all(`SELECT * FROM polls ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const polls = rows.map(row => {
      return {
        ...row,
        options: JSON.parse(row.options),
        votes: JSON.parse(row.votes),
        voted_users: JSON.parse(row.voted_users || '[]')
      };
    });
    res.json(polls);
  });
});

// 11. Create Poll
app.post('/api/polls', (req, res) => {
  const { question, options } = req.body;
  if (!question || !options || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: 'question and at least 2 options are required.' });
  }

  const id = 'poll_' + Math.random().toString(36).substr(2, 9);
  const created_at = new Date().toISOString();
  const optionsStr = JSON.stringify(options);
  
  const initialVotes = {};
  options.forEach((_, idx) => {
    initialVotes[idx] = 0;
  });
  const votesStr = JSON.stringify(initialVotes);

  db.run(
    `INSERT INTO polls (id, question, options, votes, voted_users, created_at) VALUES (?, ?, ?, ?, '[]', ?)`,
    [id, question, optionsStr, votesStr, created_at],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, poll_id: id });
    }
  );
});

// 12. Vote on Poll
app.post('/api/polls/:id/vote', (req, res) => {
  const poll_id = req.params.id;
  const { user_id, option_index } = req.body;

  if (!user_id || option_index === undefined) {
    return res.status(400).json({ error: 'user_id and option_index are required.' });
  }

  db.get(`SELECT * FROM polls WHERE id = ?`, [poll_id], (err, poll) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!poll) return res.status(404).json({ error: 'Poll not found.' });

    const votedUsers = JSON.parse(poll.voted_users || '[]');
    if (votedUsers.includes(user_id)) {
      return res.status(400).json({ error: 'User has already voted in this poll.' });
    }

    const votes = JSON.parse(poll.votes);
    votes[option_index] = (votes[option_index] || 0) + 1;
    votedUsers.push(user_id);

    db.run(
      `UPDATE polls SET votes = ?, voted_users = ? WHERE id = ?`,
      [JSON.stringify(votes), JSON.stringify(votedUsers), poll_id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        emitEvent('forum-events', { type: 'poll-vote', poll_id, user_id, option_index, timestamp: new Date() });
        res.json({ success: true, votes, voted_users: votedUsers });
      }
    );
  });
});

// Fallback to HTML
app.get('*any', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
