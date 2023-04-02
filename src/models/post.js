const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    post_message: {
      type: String,
      required: true,
    },
    previous_message: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
      },
    ],
    is_active: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
