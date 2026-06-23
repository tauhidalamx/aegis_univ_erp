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
const PORT = process.env.PORT || 5000;

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
      avatar TEXT,
      password_changed INTEGER DEFAULT 0
    )`);

    // Posts table
    db.run(`CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL, -- 'text', 'image', 'video', 'pdf'
      content TEXT,
      media_url TEXT,
      pdf_url TEXT,
      category TEXT DEFAULT 'campus',
      created_at TEXT NOT NULL,
      likes_count INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Dynamically update old database schemas if columns are missing
    db.run("ALTER TABLE posts ADD COLUMN category TEXT DEFAULT 'campus'", () => {});
    db.run("ALTER TABLE posts ADD COLUMN pdf_url TEXT", () => {});
    db.run("ALTER TABLE users ADD COLUMN password_changed INTEGER DEFAULT 0", () => {});

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

    // Market Watchlist table
    db.run(`CREATE TABLE IF NOT EXISTS market_watchlist (
      user_id TEXT NOT NULL,
      symbol TEXT NOT NULL,
      PRIMARY KEY (user_id, symbol)
    )`);

    // Market Portfolio table
    db.run(`CREATE TABLE IF NOT EXISTS market_portfolio (
      user_id TEXT PRIMARY KEY,
      cash REAL DEFAULT 10000.0,
      holdings TEXT DEFAULT '{}'
    )`);

    // Market Transactions table
    db.run(`CREATE TABLE IF NOT EXISTS market_transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      symbol TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL,
      type TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`);

    // Market Alerts table
    db.run(`CREATE TABLE IF NOT EXISTS market_alerts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      symbol TEXT NOT NULL,
      trigger_price REAL NOT NULL,
      condition TEXT NOT NULL,
      status TEXT DEFAULT 'ACTIVE',
      created_at TEXT NOT NULL
    )`);

    // Sports Athletes table
    db.run(`CREATE TABLE IF NOT EXISTS sports_athletes (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      status TEXT DEFAULT 'Active',
      medical_records TEXT DEFAULT 'No concerns reported.',
      fitness_scores TEXT DEFAULT '{}',
      achievements TEXT DEFAULT '[]',
      ranking INTEGER DEFAULT 0,
      statistics TEXT DEFAULT '{}',
      scholarship_id TEXT,
      created_at TEXT NOT NULL
    )`);

    // Sports Teams table
    db.run(`CREATE TABLE IF NOT EXISTS sports_teams (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      sport TEXT NOT NULL,
      captain_id TEXT,
      roster TEXT DEFAULT '[]',
      stats TEXT DEFAULT '{}',
      created_at TEXT NOT NULL
    )`);

    // Sports Tournaments table
    db.run(`CREATE TABLE IF NOT EXISTS sports_tournaments (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      sport TEXT NOT NULL,
      fixtures TEXT DEFAULT '[]',
      schedules TEXT DEFAULT '[]',
      standings TEXT DEFAULT '[]',
      brackets TEXT DEFAULT '[]',
      results TEXT DEFAULT '[]',
      awards TEXT DEFAULT '[]',
      certificates TEXT DEFAULT '[]',
      status TEXT DEFAULT 'Upcoming',
      created_at TEXT NOT NULL
    )`);

    // Sports Matches table
    db.run(`CREATE TABLE IF NOT EXISTS sports_matches (
      id TEXT PRIMARY KEY,
      tournament_id TEXT,
      sport TEXT NOT NULL,
      team_a TEXT NOT NULL,
      team_b TEXT NOT NULL,
      schedule TEXT NOT NULL,
      venue TEXT NOT NULL,
      lineups TEXT DEFAULT '{}',
      officials TEXT DEFAULT '[]',
      results TEXT DEFAULT '{}',
      statistics TEXT DEFAULT '{}',
      highlights TEXT DEFAULT '[]',
      report TEXT DEFAULT '',
      status TEXT DEFAULT 'Scheduled'
    )`);

    // Sports Training table
    db.run(`CREATE TABLE IF NOT EXISTS sports_training (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      sport TEXT NOT NULL,
      plans TEXT DEFAULT '[]',
      coaching_sessions TEXT DEFAULT '[]',
      practice_attendance TEXT DEFAULT '{}',
      fitness_programs TEXT DEFAULT '[]',
      skill_assessments TEXT DEFAULT '{}',
      created_at TEXT NOT NULL
    )`);

    // Sports Facilities table
    db.run(`CREATE TABLE IF NOT EXISTS sports_facilities (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      bookings TEXT DEFAULT '[]',
      maintenance TEXT DEFAULT '[]',
      utilization TEXT DEFAULT '{}',
      created_at TEXT NOT NULL
    )`);

    // Sports Scholarships table
    db.run(`CREATE TABLE IF NOT EXISTS sports_scholarships (
      id TEXT PRIMARY KEY,
      athlete_id TEXT NOT NULL,
      funding REAL DEFAULT 0.0,
      awards TEXT DEFAULT '[]',
      requirements TEXT DEFAULT '[]',
      renewals TEXT DEFAULT '[]',
      status TEXT DEFAULT 'Active',
      created_at TEXT NOT NULL
    )`);

    // Sports Scouting table
    db.run(`CREATE TABLE IF NOT EXISTS sports_scouting (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      sport TEXT NOT NULL,
      tryouts TEXT DEFAULT '[]',
      evaluation TEXT DEFAULT '{}',
      scouting_reports TEXT DEFAULT '[]',
      potential_score REAL DEFAULT 0.0,
      created_at TEXT NOT NULL
    )`);

    // Sync users from js/data.js
    syncUsersFromDataJS();

    // Seed Sports data
    seedSportsData();

    // Seed Next-Gen data
    seedNextGenData();
  });
}

function seedNextGenData() {
  db.serialize(() => {
    // 1. SOC Incidents
    db.run(`CREATE TABLE IF NOT EXISTS soc_incidents (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      severity TEXT NOT NULL,
      status TEXT NOT NULL,
      operator TEXT,
      created_at TEXT NOT NULL
    )`);

    // 2. Studio Workflows
    db.run(`CREATE TABLE IF NOT EXISTS studio_workflows (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      trigger TEXT NOT NULL,
      nodes TEXT DEFAULT '[]',
      status TEXT DEFAULT 'Active',
      created_at TEXT NOT NULL
    )`);

    // 3. Admissions Applications
    db.run(`CREATE TABLE IF NOT EXISTS admissions_applications (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      status TEXT NOT NULL,
      department TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`);

    // 4. Procurement Orders
    db.run(`CREATE TABLE IF NOT EXISTS procurement_orders (
      id TEXT PRIMARY KEY,
      item TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL,
      vendor TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`);

    // 5. Compliance Policies
    db.run(`CREATE TABLE IF NOT EXISTS compliance_policies (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      auditor TEXT,
      created_at TEXT NOT NULL
    )`);

    // Seed mock data if empty
    db.get(`SELECT COUNT(*) as count FROM soc_incidents`, [], (err, row) => {
      if (err || (row && row.count > 0)) return;

      console.log("Seeding next-generation AEGIS OS tables...");

      // Seed SOC Incidents
      const incidents = [
        { id: 'inc_1', title: 'Brute-force attempt detected on Admin IAM Gateway', severity: 'Critical', status: 'Open', operator: 'SecOps Team Alpha', created_at: new Date().toISOString() },
        { id: 'inc_2', title: 'Anomaly latency spike in Node 4 RAFT synchronization', severity: 'Medium', status: 'Investigating', operator: 'Consortium Lead Eng', created_at: new Date().toISOString() },
        { id: 'inc_3', title: 'Outdated SSL certificate warning in secondary campus edge', severity: 'Low', status: 'Resolved', operator: 'Dr. Evelyn Sterling', created_at: new Date().toISOString() }
      ];
      incidents.forEach(inc => {
        db.run(`INSERT INTO soc_incidents (id, title, severity, status, operator, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
          [inc.id, inc.title, inc.severity, inc.status, inc.operator, inc.created_at]);
      });

      // Seed Studio Workflows
      const workflows = [
        { id: 'flow_1', title: 'Mint Soulbound Degree SBT on Graduation', trigger: 'student.graduated', nodes: JSON.stringify([{ id: 'n1', label: 'Verify GPA >= 2.00' }, { id: 'n2', label: 'Mint SBT Token' }]), status: 'Active', created_at: new Date().toISOString() },
        { id: 'flow_2', title: 'Release Research Milestone Grant Escrow', trigger: 'research.milestone_approved', nodes: JSON.stringify([{ id: 'n1', label: 'Verify Peer Review Citations' }, { id: 'n2', label: 'Release ESCROW' }]), status: 'Active', created_at: new Date().toISOString() }
      ];
      workflows.forEach(flow => {
        db.run(`INSERT INTO studio_workflows (id, title, trigger, nodes, status, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
          [flow.id, flow.title, flow.trigger, flow.nodes, flow.status, flow.created_at]);
      });

      // Seed Admissions Applications
      const admissions = [
        { id: 'adm_1', name: 'John Doe', email: 'john.doe@gmail.com', status: 'Verified', department: 'Computer Science', created_at: new Date().toISOString() },
        { id: 'adm_2', name: 'Alice Smith', email: 'alice.smith@yahoo.com', status: 'Applied', department: 'BioTech', created_at: new Date().toISOString() },
        { id: 'adm_3', name: 'Bob Johnson', email: 'bob.j@outlook.com', status: 'Approved', department: 'Business Admin', created_at: new Date().toISOString() }
      ];
      admissions.forEach(adm => {
        db.run(`INSERT INTO admissions_applications (id, name, email, status, department, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
          [adm.id, adm.name, adm.email, adm.status, adm.department, adm.created_at]);
      });

      // Seed Procurement Orders
      const procurements = [
        { id: 'order_1', item: 'Nvidia H100 GPU Cluster Racks', qty: 2, price: 65000.0, vendor: 'Nvidia Corp Enterprise', status: 'Delivered', created_at: new Date().toISOString() },
        { id: 'order_2', item: 'Dell PowerEdge R760 Server Nodes', qty: 10, price: 4500.0, vendor: 'Dell Technologies', status: 'Approved', created_at: new Date().toISOString() },
        { id: 'order_3', item: 'Smart Campus RFID Access Cards', qty: 5000, price: 1.5, vendor: 'SecureID Solutions', status: 'Pending', created_at: new Date().toISOString() }
      ];
      procurements.forEach(order => {
        db.run(`INSERT INTO procurement_orders (id, item, qty, price, vendor, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [order.id, order.item, order.qty, order.price, order.vendor, order.status, order.created_at]);
      });

      // Seed Compliance Policies
      const compliance = [
        { id: 'pol_1', name: 'Family Educational Rights and Privacy Act (FERPA)', type: 'Data Privacy', status: 'Compliant', auditor: 'Compliance Officer Davis', created_at: new Date().toISOString() },
        { id: 'pol_2', name: 'Consortium Zero-Knowledge Audit Protocol (ZK-AUDIT)', type: 'Cryptographic', status: 'Compliant', auditor: 'Lead Blockchain Auditor', created_at: new Date().toISOString() },
        { id: 'pol_3', name: 'General Data Protection Regulation (GDPR) Cross-border Transcripts', type: 'Data Privacy', status: 'Warning', auditor: 'EU Compliance Consultant', created_at: new Date().toISOString() }
      ];
      compliance.forEach(pol => {
        db.run(`INSERT INTO compliance_policies (id, name, type, status, auditor, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
          [pol.id, pol.name, pol.type, pol.status, pol.auditor, pol.created_at]);
      });

      console.log("✓ Next-generation AEGIS OS tables populated.");
    });
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

    // Insert Default HOD demo account
    db.run(`INSERT OR REPLACE INTO users (id, name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?, ?)`, [
      'usr_004',
      'Prof. Sarah Jenkins',
      'hod@aegis.edu',
      hashPassword('hod123'),
      'hod',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    ]);

    // Insert Default Placement Officer demo account
    db.run(`INSERT OR REPLACE INTO users (id, name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?, ?)`, [
      'usr_005',
      'Dr. Arthur Pendelton',
      'placement@aegis.edu',
      hashPassword('placement123'),
      'placement_officer',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'
    ]);

    // Insert Enterprise Demo Accounts
    const demoAccounts = [
      { id: 'usr_demo_1', name: 'Global Super Admin', email: 'superadmin@aegis.demo', role: 'superadmin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
      { id: 'usr_demo_2', name: 'Platform Admin', email: 'admin@aegis.demo', role: 'platformadmin', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150' },
      { id: 'usr_demo_3', name: 'University Admin', email: 'univadmin@aegis.demo', role: 'admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
      { id: 'usr_demo_4', name: 'Registrar Officer', email: 'registrar@aegis.demo', role: 'registrar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { id: 'usr_demo_5', name: 'Dean of Faculty', email: 'dean@aegis.demo', role: 'dean', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
      { id: 'usr_demo_6', name: 'Professor Jenkins (HOD)', email: 'hod@aegis.demo', role: 'hod', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
      { id: 'usr_demo_7', name: 'Professor Sterling (Faculty)', email: 'faculty@aegis.demo', role: 'faculty', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
      { id: 'usr_demo_8', name: 'Finance Manager', email: 'finance@aegis.demo', role: 'finance_manager', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
      { id: 'usr_demo_9', name: 'Research Coordinator', email: 'research@aegis.demo', role: 'research_coordinator', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { id: 'usr_demo_10', name: 'Placement Officer', email: 'placement@aegis.demo', role: 'placement_officer', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150' },
      { id: 'usr_demo_11', name: 'Alex Rivera (Student)', email: 'student@aegis.demo', role: 'student', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' },
      { id: 'usr_demo_12', name: 'Parent Account', email: 'parent@aegis.demo', role: 'sports_parent', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
      { id: 'usr_demo_13', name: 'Alumni Account', email: 'alumni@aegis.demo', role: 'alumni', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150' },
      { id: 'usr_demo_14', name: 'Lead Recruiter', email: 'recruiter@aegis.demo', role: 'recruiter', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
      { id: 'usr_demo_sports_dir', name: 'Dr. Sarah Sterling (Sports Director)', email: 'sportsdirector@aegis.demo', role: 'sports_director', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
      { id: 'usr_demo_coach', name: 'Coach Marcus Chen', email: 'coach@aegis.demo', role: 'coach', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { id: 'usr_demo_athlete', name: 'Aria Nakamura (Athlete)', email: 'athlete@aegis.demo', role: 'athlete', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
      { id: 'usr_demo_parent_gen', name: 'General Parent Account', email: 'parent_role@aegis.demo', role: 'parent', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
      { id: 'usr_demo_dept', name: 'Department Admin', email: 'deptadmin@aegis.demo', role: 'department_admin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
      { id: 'usr_demo_library', name: 'Library Administrator', email: 'libraryadmin@aegis.demo', role: 'library_admin', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
      { id: 'usr_demo_hostel', name: 'Hostel Manager', email: 'hosteladmin@aegis.demo', role: 'hostel_admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { id: 'usr_demo_transport', name: 'Transport Coordinator', email: 'transportadmin@aegis.demo', role: 'transport_admin', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
      { id: 'usr_demo_medical', name: 'Dr. Evelyn Carter (Medical Staff)', email: 'medical@aegis.demo', role: 'medical_staff', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
      { id: 'usr_demo_guest', name: 'Guest Visitor', email: 'guest@aegis.demo', role: 'guest', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' },
      { id: 'usr_demo_consultant', name: 'External Consultant', email: 'consultant@aegis.demo', role: 'consultant', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150' },
      { id: 'usr_demo_auditor', name: 'Internal Auditor', email: 'auditor@aegis.demo', role: 'auditor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
      { id: 'usr_demo_compliance', name: 'Governance Compliance Officer', email: 'compliance@aegis.demo', role: 'compliance_officer', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150' }
    ];

    demoAccounts.forEach(demo => {
      db.run(`INSERT OR REPLACE INTO users (id, name, email, password, role, avatar, password_changed) VALUES (?, ?, ?, ?, ?, ?, 0)`, [
        demo.id,
        demo.name,
        demo.email,
        hashPassword('Demo@123'),
        demo.role,
        demo.avatar
      ]);
    });

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
      let plainPassword = `${cleanFirstName}@${stu.id}`;
      if (stu.email === 'student@aegis.edu') {
        plainPassword = 'student123';
      }

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

function seedSportsData() {
  db.get(`SELECT COUNT(*) as count FROM sports_athletes`, [], (err, row) => {
    if (err || (row && row.count > 0)) return;

    console.log("Seeding realistic AEGIS SPORTS dataset...");

    // 1. Seed Athletes
    const athletes = [
      { id: 'ath_1', user_id: 'usr_demo_11', status: 'Active', medical_records: 'No issues. Fully cleared.', fitness_scores: JSON.stringify({ vo2_max: 56, bmi: 22.8, endurance: 85, strength: 80, speed: 78, recovery: 92 }), achievements: JSON.stringify(['Gold Medalist Varsity 100m', 'All-State Roster 2025']), ranking: 3, statistics: JSON.stringify({ matches_played: 24, goals: 12, assists: 8, yellow_cards: 1 }), created_at: new Date().toISOString() },
      { id: 'ath_2', user_id: 'usr_demo_athlete', status: 'Active', medical_records: 'Cleared for high-altitude training.', fitness_scores: JSON.stringify({ vo2_max: 52, bmi: 21.2, endurance: 88, strength: 75, speed: 92, recovery: 87 }), achievements: JSON.stringify(['MVP Regional Tournament 2025', 'Academic Athlete Honors']), ranking: 1, statistics: JSON.stringify({ matches_played: 32, points: 512, rebounds: 124, assists: 198 }), created_at: new Date().toISOString() },
      { id: 'ath_3', user_id: 'usr_demo_7', status: 'Injured', medical_records: 'Grade 1 hamstring strain. Recovery timeline: 2 weeks.', fitness_scores: JSON.stringify({ vo2_max: 48, bmi: 24.1, endurance: 70, strength: 85, speed: 65, recovery: 60 }), achievements: JSON.stringify(['Shotput Runner-Up 2024']), ranking: 12, statistics: JSON.stringify({ events_played: 10, throw_max_m: 16.5 }), created_at: new Date().toISOString() }
    ];
    athletes.forEach(ath => {
      db.run(`INSERT INTO sports_athletes (id, user_id, status, medical_records, fitness_scores, achievements, ranking, statistics, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [ath.id, ath.user_id, ath.status, ath.medical_records, ath.fitness_scores, ath.achievements, ath.ranking, ath.statistics, ath.created_at]);
    });

    // 2. Seed Teams
    const teams = [
      { id: 'team_1', name: 'Aegis Warriors FC', sport: 'Football', captain_id: 'usr_demo_11', roster: JSON.stringify(['Alex Rivera', 'Jordan Smith', 'Marcus Carter']), stats: JSON.stringify({ wins: 14, losses: 3, draws: 2, win_rate: '73%' }), created_at: new Date().toISOString() },
      { id: 'team_2', name: 'Aegis Titans', sport: 'Basketball', captain_id: 'usr_demo_athlete', roster: JSON.stringify(['Aria Nakamura', 'Chloe Miller', 'Jordan Smith']), stats: JSON.stringify({ wins: 18, losses: 2, draws: 0, win_rate: '90%' }), created_at: new Date().toISOString() },
      { id: 'team_3', name: 'Aegis Aces', sport: 'Tennis', captain_id: 'usr_demo_11', roster: JSON.stringify(['Jordan Smith', 'Aria Nakamura']), stats: JSON.stringify({ wins: 10, losses: 5, draws: 0, win_rate: '66%' }), created_at: new Date().toISOString() }
    ];
    teams.forEach(t => {
      db.run(`INSERT INTO sports_teams (id, name, sport, captain_id, roster, stats, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [t.id, t.name, t.sport, t.captain_id, t.roster, t.stats, t.created_at]);
    });

    // 3. Seed Tournaments
    const tournaments = [
      { id: 'tour_1', name: 'Aegis Annual Varsity League 2026', sport: 'Football', status: 'Ongoing', fixtures: JSON.stringify([{ id: 'match_1', team_a: 'Aegis Warriors FC', team_b: 'State Tech', date: '2026-06-14', time: '16:00' }]), standings: JSON.stringify([{ rank: 1, team: 'Aegis Warriors FC', points: 24 }, { rank: 2, team: 'State Tech', points: 19 }]), brackets: '{}', results: '[]', created_at: new Date().toISOString() },
      { id: 'tour_2', name: 'Inter-University Basketball Clash', sport: 'Basketball', status: 'Upcoming', fixtures: JSON.stringify([{ id: 'match_2', team_a: 'Aegis Titans', team_b: 'Metro Wolves', date: '2026-06-15', time: '18:00' }]), standings: '[]', brackets: '{}', results: '[]', created_at: new Date().toISOString() },
      { id: 'tour_3', name: 'Consortium Esports Championship', sport: 'Esports', status: 'Completed', fixtures: '[]', standings: '[]', brackets: '{}', results: JSON.stringify([{ winner: 'Aegis Elite', runner_up: 'Coast Raiders' }]), created_at: new Date().toISOString() }
    ];
    tournaments.forEach(tour => {
      db.run(`INSERT INTO sports_tournaments (id, name, sport, status, fixtures, standings, brackets, results, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [tour.id, tour.name, tour.sport, tour.status, tour.fixtures, tour.standings, tour.brackets, tour.results, tour.created_at]);
    });

    // 4. Seed Matches
    const matches = [
      { id: 'match_1', tournament_id: 'tour_1', sport: 'Football', team_a: 'Aegis Warriors FC', team_b: 'State Tech', schedule: '2026-06-14 16:00', venue: 'Aegis Athletics Arena', lineups: JSON.stringify({ team_a: ['Alex Rivera (GK)', 'Jordan Smith', 'Marcus Carter'], team_b: ['T. Adams', 'K. Davis', 'J. Cole'] }), officials: JSON.stringify(['Ref: Robert Webb', 'Linesman: Alice Kay']), results: JSON.stringify({ score_a: 2, score_b: 1, winner: 'Aegis Warriors FC' }), statistics: JSON.stringify({ possession_a: 54, possession_b: 46, shots_a: 12, shots_b: 8 }), highlights: JSON.stringify(['Goal: Alex Rivera 24\'', 'Goal: Jordan Smith 76\'']), report: 'A high intensity physical game with Aegis dominating the wings.', status: 'Completed' },
      { id: 'match_2', tournament_id: 'tour_2', sport: 'Basketball', team_a: 'Aegis Titans', team_b: 'Metro Wolves', schedule: '2026-06-15 18:00', venue: 'Varsity Court A', lineups: '{}', officials: JSON.stringify(['Ref: Marcus Lane']), results: '{}', statistics: '{}', highlights: '[]', report: '', status: 'Live' },
      { id: 'match_3', tournament_id: 'tour_2', sport: 'Basketball', team_a: 'Aegis Titans', team_b: 'Coast Raiders', schedule: '2026-06-20 18:00', venue: 'Varsity Court A', lineups: '{}', officials: JSON.stringify(['Ref: Marcus Lane']), results: '{}', statistics: '{}', highlights: '[]', report: '', status: 'Scheduled' }
    ];
    matches.forEach(m => {
      db.run(`INSERT INTO sports_matches (id, tournament_id, sport, team_a, team_b, schedule, venue, lineups, officials, results, statistics, highlights, report, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [m.id, m.tournament_id, m.sport, m.team_a, m.team_b, m.schedule, m.venue, m.lineups, m.officials, m.results, m.statistics, m.highlights, m.report, m.status]);
    });

    // 5. Seed Training
    const training = [
      { id: 'train_1', title: 'High-Altitude Conditioning', sport: 'Basketball', plans: JSON.stringify(['Warmup: 15m jogging', 'Sprints: 10x 100m', 'Tactics: Pick & Roll setup']), coaching_sessions: JSON.stringify(['Session 1: Speed development', 'Session 2: Tactical awareness']), practice_attendance: JSON.stringify({ '2026-06-10': { 'usr_demo_athlete': 'Present', 'usr_demo_11': 'Present' } }), fitness_programs: JSON.stringify(['Cardio Block A', 'Strength Set B']), skill_assessments: JSON.stringify({ 'usr_demo_athlete': { shooting: 92, passing: 88, physical: 85 } }), created_at: new Date().toISOString() }
    ];
    training.forEach(tr => {
      db.run(`INSERT INTO sports_training (id, title, sport, plans, coaching_sessions, practice_attendance, fitness_programs, skill_assessments, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [tr.id, tr.title, tr.sport, tr.plans, tr.coaching_sessions, tr.practice_attendance, tr.fitness_programs, tr.skill_assessments, tr.created_at]);
    });

    // 6. Seed Facilities
    const facilities = [
      { id: 'fac_1', name: 'Aegis Athletics Arena', type: 'Ground', bookings: JSON.stringify([{ match_id: 'match_1', date: '2026-06-14' }]), maintenance: JSON.stringify([{ task: 'Track mowing', date: '2026-06-08', cost: '$400' }]), utilization: JSON.stringify({ rate: 85, hours_booked: 48 }), created_at: new Date().toISOString() },
      { id: 'fac_2', name: 'Varsity Court A', type: 'Court', bookings: JSON.stringify([{ match_id: 'match_2', date: '2026-06-15' }]), maintenance: JSON.stringify([]), utilization: JSON.stringify({ rate: 72, hours_booked: 36 }), created_at: new Date().toISOString() },
      { id: 'fac_3', name: 'Elite Fitness Hub', type: 'Gym', bookings: '[]', maintenance: JSON.stringify([{ task: 'Cable pulley repair', date: '2026-06-12' }]), utilization: JSON.stringify({ rate: 94, hours_booked: 60 }), created_at: new Date().toISOString() }
    ];
    facilities.forEach(fac => {
      db.run(`INSERT INTO sports_facilities (id, name, type, bookings, maintenance, utilization, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [fac.id, fac.name, fac.type, fac.bookings, fac.maintenance, fac.utilization, fac.created_at]);
    });

    // 7. Seed Scholarships
    const scholarships = [
      { id: 'schol_1', athlete_id: 'ath_2', funding: 15000, awards: JSON.stringify(['Provost Athletic Scholarship']), requirements: JSON.stringify(['GPA >= 3.00', '90% Practice Attendance']), renewals: JSON.stringify([{ year: 2026, status: 'Approved' }]), status: 'Active', created_at: new Date().toISOString() },
      { id: 'schol_2', athlete_id: 'ath_1', funding: 12000, awards: JSON.stringify(['Varsity Excellence Grant']), requirements: JSON.stringify(['GPA >= 2.50']), renewals: '[]', status: 'Active', created_at: new Date().toISOString() }
    ];
    scholarships.forEach(s => {
      db.run(`INSERT INTO sports_scholarships (id, athlete_id, funding, awards, requirements, renewals, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [s.id, s.athlete_id, s.funding, s.awards, s.requirements, s.renewals, s.status, s.created_at]);
    });

    // 8. Seed Scouting
    const scouting = [
      { id: 'scout_1', name: 'Landon Vance', sport: 'Football', tryouts: JSON.stringify(['Sprint: 4.52s', 'Vertical: 32"']), evaluation: JSON.stringify({ pacing: 90, agility: 88, vision: 92 }), scouting_reports: JSON.stringify(['AI: Elite pace on wings, clinical finisher under pressure. Potential Star.']), potential_score: 93.5, created_at: new Date().toISOString() },
      { id: 'scout_2', name: 'Selena Gomez', sport: 'Badminton', tryouts: JSON.stringify(['Reflex: 0.12s']), evaluation: JSON.stringify({ hand_eye: 94, court_coverage: 85 }), scouting_reports: JSON.stringify(['AI: Speedy court coverage, tactical serves. High physical endurance.']), potential_score: 88.0, created_at: new Date().toISOString() }
    ];
    scouting.forEach(sc => {
      db.run(`INSERT INTO sports_scouting (id, name, sport, tryouts, evaluation, scouting_reports, potential_score, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [sc.id, sc.name, sc.sport, sc.tryouts, sc.evaluation, sc.scouting_reports, sc.potential_score, sc.created_at]);
    });

    console.log("✓ AEGIS SPORTS dataset seeded.");
  });
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
  db.get(`SELECT id, name, email, role, avatar, password_changed FROM users WHERE email = ? AND password = ?`, [email, hashedPassword], (err, user) => {
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

app.post('/api/auth/change-password', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Email, current password, and new password are required.' });
  }

  const hashedOld = hashPassword(oldPassword);
  db.get(`SELECT id FROM users WHERE email = ? AND password = ?`, [email, hashedOld], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error occurred.' });
    if (!user) return res.status(401).json({ error: 'Incorrect current password.' });

    const hashedNew = hashPassword(newPassword);
    db.run(`UPDATE users SET password = ?, password_changed = 1 WHERE email = ?`, [hashedNew, email], function(err) {
      if (err) return res.status(500).json({ error: 'Failed to update password.' });
      
      db.get(`SELECT id, name, email, role, avatar FROM users WHERE email = ?`, [email], (err, updatedUser) => {
        if (err || !updatedUser) return res.status(500).json({ error: 'Failed to retrieve updated user profile.' });
        emitEvent('user-events', { type: 'password-change', email: updatedUser.email, name: updatedUser.name, timestamp: new Date() });
        res.json({ success: true, user: updatedUser });
      });
    });
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
  const { user_id, content, type, category } = req.body;
  if (!user_id || !type) {
    return res.status(400).json({ error: 'user_id and type are required fields.' });
  }

  const id = 'post_' + Math.random().toString(36).substr(2, 9);
  let media_url = req.file ? `/uploads/${req.file.filename}` : null;
  let pdf_url = null;
  let postType = type;

  if (req.file) {
    if (req.file.mimetype === 'application/pdf' || req.file.originalname.endsWith('.pdf')) {
      pdf_url = `/uploads/${req.file.filename}`;
      media_url = null;
      postType = 'pdf';
    }
  }

  const created_at = new Date().toISOString();
  const postCategory = category || 'campus';

  db.run(
    `INSERT INTO posts (id, user_id, type, content, media_url, pdf_url, category, created_at, likes_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
    [id, user_id, postType, content || '', media_url, pdf_url, postCategory, created_at],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      emitEvent('forum-events', { type: 'post-create', post_id: id, user_id, type: postType, category: postCategory, timestamp: new Date() });
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

// SPORTS API ENDPOINTS
app.get('/api/sports/summary', (req, res) => {
  const summary = {};
  db.get(`SELECT COUNT(*) as count FROM sports_athletes`, (err, row) => {
    summary.total_athletes = row ? row.count : 0;
    db.get(`SELECT COUNT(*) as count FROM sports_teams`, (err, row) => {
      summary.active_teams = row ? row.count : 0;
      db.get(`SELECT COUNT(*) as count FROM sports_matches WHERE status = 'Scheduled' OR status = 'Live'`, (err, row) => {
        summary.upcoming_matches = row ? row.count : 0;
        db.get(`SELECT SUM(funding) as funding FROM sports_scholarships WHERE status = 'Active'`, (err, row) => {
          summary.total_scholarships = row ? row.funding || 0 : 0;
          db.get(`SELECT COUNT(*) as count FROM sports_athletes WHERE status = 'Injured'`, (err, row) => {
            summary.injury_reports = row ? row.count : 0;
            res.json(summary);
          });
        });
      });
    });
  });
});

app.get('/api/sports/athletes', (req, res) => {
  db.all(`SELECT sports_athletes.*, users.name as user_name, users.avatar as user_avatar, users.email as user_email
          FROM sports_athletes
          JOIN users ON sports_athletes.user_id = users.id`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(r => ({
      ...r,
      fitness_scores: JSON.parse(r.fitness_scores || '{}'),
      achievements: JSON.parse(r.achievements || '[]'),
      statistics: JSON.parse(r.statistics || '{}')
    }));
    res.json(parsed);
  });
});

app.post('/api/sports/athletes', (req, res) => {
  const { id, user_id, status, medical_records, fitness_scores, achievements, ranking, statistics } = req.body;
  db.run(`INSERT OR REPLACE INTO sports_athletes (id, user_id, status, medical_records, fitness_scores, achievements, ranking, statistics, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id || 'ath_' + Date.now().toString(36), user_id, status || 'Active', medical_records || '', JSON.stringify(fitness_scores || {}), JSON.stringify(achievements || []), ranking || 0, JSON.stringify(statistics || {}), new Date().toISOString()],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

app.get('/api/sports/teams', (req, res) => {
  db.all(`SELECT * FROM sports_teams`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(r => ({
      ...r,
      roster: JSON.parse(r.roster || '[]'),
      stats: JSON.parse(r.stats || '{}')
    }));
    res.json(parsed);
  });
});

app.post('/api/sports/teams', (req, res) => {
  const { name, sport, captain_id, roster, stats } = req.body;
  const id = 'team_' + Math.random().toString(36).substr(2, 9);
  db.run(`INSERT INTO sports_teams (id, name, sport, captain_id, roster, stats, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, name, sport, captain_id || '', JSON.stringify(roster || []), JSON.stringify(stats || {}), new Date().toISOString()],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

app.get('/api/sports/tournaments', (req, res) => {
  db.all(`SELECT * FROM sports_tournaments`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(r => ({
      ...r,
      fixtures: JSON.parse(r.fixtures || '[]'),
      schedules: JSON.parse(r.schedules || '[]'),
      standings: JSON.parse(r.standings || '[]'),
      brackets: JSON.parse(r.brackets || '{}'),
      results: JSON.parse(r.results || '[]'),
      awards: JSON.parse(r.awards || '[]'),
      certificates: JSON.parse(r.certificates || '[]')
    }));
    res.json(parsed);
  });
});

app.post('/api/sports/tournaments', (req, res) => {
  const { name, sport, fixtures, standings, status } = req.body;
  const id = 'tour_' + Math.random().toString(36).substr(2, 9);
  db.run(`INSERT INTO sports_tournaments (id, name, sport, status, fixtures, standings, brackets, results, created_at) VALUES (?, ?, ?, ?, ?, ?, '{}', '[]', ?)`,
    [id, name, sport, status || 'Upcoming', JSON.stringify(fixtures || []), JSON.stringify(standings || []), new Date().toISOString()],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

app.get('/api/sports/matches', (req, res) => {
  db.all(`SELECT * FROM sports_matches ORDER BY schedule ASC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(r => ({
      ...r,
      lineups: JSON.parse(r.lineups || '{}'),
      officials: JSON.parse(r.officials || '[]'),
      results: JSON.parse(r.results || '{}'),
      statistics: JSON.parse(r.statistics || '{}'),
      highlights: JSON.parse(r.highlights || '[]')
    }));
    res.json(parsed);
  });
});

app.post('/api/sports/matches', (req, res) => {
  const { tournament_id, sport, team_a, team_b, schedule, venue, status } = req.body;
  const id = 'match_' + Math.random().toString(36).substr(2, 9);
  db.run(`INSERT INTO sports_matches (id, tournament_id, sport, team_a, team_b, schedule, venue, lineups, officials, results, statistics, highlights, report, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, '{}', '[]', '{}', '{}', '[]', '', ?)`,
    [id, tournament_id || '', sport, team_a, team_b, schedule, venue, status || 'Scheduled'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

app.get('/api/sports/training', (req, res) => {
  db.all(`SELECT * FROM sports_training`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(r => ({
      ...r,
      plans: JSON.parse(r.plans || '[]'),
      coaching_sessions: JSON.parse(r.coaching_sessions || '[]'),
      practice_attendance: JSON.parse(r.practice_attendance || '{}'),
      fitness_programs: JSON.parse(r.fitness_programs || '[]'),
      skill_assessments: JSON.parse(r.skill_assessments || '{}')
    }));
    res.json(parsed);
  });
});

app.get('/api/sports/fitness', (req, res) => {
  db.all(`SELECT id, fitness_scores, user_id FROM sports_athletes`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(r => ({
      id: 'fit_' + r.id,
      athlete_id: r.id,
      fitness_scores: JSON.parse(r.fitness_scores || '{}')
    }));
    res.json(parsed);
  });
});

app.get('/api/sports/facilities', (req, res) => {
  db.all(`SELECT * FROM sports_facilities`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(r => ({
      ...r,
      bookings: JSON.parse(r.bookings || '[]'),
      maintenance: JSON.parse(r.maintenance || '[]'),
      utilization: JSON.parse(r.utilization || '{}')
    }));
    res.json(parsed);
  });
});

app.get('/api/sports/scholarships', (req, res) => {
  db.all(`SELECT sports_scholarships.*, users.name as athlete_name
          FROM sports_scholarships
          JOIN sports_athletes ON sports_scholarships.athlete_id = sports_athletes.id
          JOIN users ON sports_athletes.user_id = users.id`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(r => ({
      ...r,
      awards: JSON.parse(r.awards || '[]'),
      requirements: JSON.parse(r.requirements || '[]'),
      renewals: JSON.parse(r.renewals || '[]')
    }));
    res.json(parsed);
  });
});

app.get('/api/sports/scouting', (req, res) => {
  db.all(`SELECT * FROM sports_scouting`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(r => ({
      ...r,
      tryouts: JSON.parse(r.tryouts || '[]'),
      evaluation: JSON.parse(r.evaluation || '{}'),
      scouting_reports: JSON.parse(r.scouting_reports || '[]')
    }));
    res.json(parsed);
  });
});

// -------------------------------------------------------------
// NEXT-GENERATION AEGIS OS UPGRADE ENDPOINTS
// -------------------------------------------------------------

app.get('/api/soc/incidents', (req, res) => {
  db.all(`SELECT * FROM soc_incidents ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/soc/incidents', (req, res) => {
  const { title, severity, status, operator } = req.body;
  const id = 'inc_' + Math.random().toString(36).substr(2, 9);
  const created_at = new Date().toISOString();
  db.run(`INSERT INTO soc_incidents (id, title, severity, status, operator, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, title, severity, status || 'Open', operator || 'SecOps Team Alpha', created_at],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

app.get('/api/studio/workflows', (req, res) => {
  db.all(`SELECT * FROM studio_workflows ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const parsed = rows.map(r => ({
      ...r,
      nodes: JSON.parse(r.nodes || '[]')
    }));
    res.json(parsed);
  });
});

app.post('/api/studio/workflows', (req, res) => {
  const { title, trigger, nodes } = req.body;
  const id = 'flow_' + Math.random().toString(36).substr(2, 9);
  const created_at = new Date().toISOString();
  db.run(`INSERT INTO studio_workflows (id, title, trigger, nodes, status, created_at) VALUES (?, ?, ?, ?, 'Active', ?)`,
    [id, title, trigger, JSON.stringify(nodes || []), created_at],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

app.get('/api/admissions/applications', (req, res) => {
  db.all(`SELECT * FROM admissions_applications ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admissions/applications', (req, res) => {
  const { name, email, status, department } = req.body;
  const id = 'adm_' + Math.random().toString(36).substr(2, 9);
  const created_at = new Date().toISOString();
  db.run(`INSERT INTO admissions_applications (id, name, email, status, department, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, name, email, status || 'Applied', department, created_at],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

app.get('/api/procurement/orders', (req, res) => {
  db.all(`SELECT * FROM procurement_orders ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/procurement/orders', (req, res) => {
  const { item, qty, price, vendor, status } = req.body;
  const id = 'order_' + Math.random().toString(36).substr(2, 9);
  const created_at = new Date().toISOString();
  db.run(`INSERT INTO procurement_orders (id, item, qty, price, vendor, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, item, parseInt(qty) || 1, parseFloat(price) || 0.0, vendor, status || 'Pending', created_at],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

app.get('/api/compliance/policies', (req, res) => {
  db.all(`SELECT * FROM compliance_policies ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/compliance/policies', (req, res) => {
  const { name, type, status, auditor } = req.body;
  const id = 'pol_' + Math.random().toString(36).substr(2, 9);
  const created_at = new Date().toISOString();
  db.run(`INSERT INTO compliance_policies (id, name, type, status, auditor, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, name, type, status || 'Compliant', auditor || 'Compliance Officer', created_at],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

// Fallback to HTML
app.get('*any', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
