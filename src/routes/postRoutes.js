const router = require('express').Router();
const {
  updatePost,
  deletePost,
  getAllPosts,
} = require('../controllers/taskController');

router.put('/:post_id', updatePost);

router.delete('/:post_id', deletePost);

router.get('/:user_id', getAllPosts);

module.exports = router;
