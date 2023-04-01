const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  role_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Role', roleSchema);
