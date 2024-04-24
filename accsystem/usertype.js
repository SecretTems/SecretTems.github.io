const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String,
    enum: ['ADMIN', 'Faculty', 'Student', 'Normal'],
    default: 'Normal'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;