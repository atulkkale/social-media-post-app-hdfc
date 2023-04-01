const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role_id: {
    type: Number,
    enum: [1, 2, 3],
    default: 2,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
