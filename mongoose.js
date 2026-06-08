const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 1. User Schema
const UserSchema = new Schema({
  _id: { type: String, required: true }, // usr_xxx
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, default: '' }
}, { timestamps: true });

// 2. Post Schema
const PostSchema = new Schema({
  _id: { type: String, required: true }, // post_xxx
  user_id: { type: String, required: true, ref: 'User' },
  type: { type: String, required: true }, // 'text', 'image', 'video'
  content: { type: String, default: '' },
  media_url: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  likes_count: { type: Number, default: 0 }
}, { timestamps: false });

// 3. Comment Schema
const CommentSchema = new Schema({
  _id: { type: String, required: true }, // comment_xxx
  post_id: { type: String, required: true, ref: 'Post' },
  user_id: { type: String, required: true, ref: 'User' },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
}, { timestamps: false });

// 4. Like Schema
const LikeSchema = new Schema({
  _id: { type: String, required: true }, // like_xxx
  post_id: { type: String, required: true, ref: 'Post' },
  user_id: { type: String, required: true, ref: 'User' }
}, { timestamps: false });
LikeSchema.index({ post_id: 1, user_id: 1 }, { unique: true });

// 5. Task Schema
const TaskSchema = new Schema({
  _id: { type: String, required: true }, // task_xxx
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, default: 'todo' }, // 'todo', 'in_progress', 'done'
  assignee_id: { type: String, ref: 'User', default: null },
  created_at: { type: Date, default: Date.now }
}, { timestamps: false });

// 6. Poll Schema
const PollSchema = new Schema({
  _id: { type: String, required: true }, // poll_xxx
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // array of option texts
  votes: { type: Map, of: Number, default: {} }, // index to vote count
  voted_users: [{ type: String }], // array of user IDs
  created_at: { type: Date, default: Date.now }
}, { timestamps: false });

// Compile Models
const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Like = mongoose.model('Like', LikeSchema);
const Task = mongoose.model('Task', TaskSchema);
const Poll = mongoose.model('Poll', PollSchema);

// Connection Function
async function connectMongoDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log('✓ Connected to MongoDB via Mongoose.');
    return true;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    return false;
  }
}

module.exports = {
  connectMongoDB,
  User,
  Post,
  Comment,
  Like,
  Task,
  Poll,
  mongoose
};
