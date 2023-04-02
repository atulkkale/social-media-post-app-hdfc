const router = require('express').Router();
const {
  updatePost,
  deletePost,
  getAllPosts,
} = require('../controllers/taskController');
const passport = require('passport');

router.put(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  updatePost
);

router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  deletePost
);

router.get(
  '/:user_id',
  passport.authenticate('jwt', { session: false }),
  getAllPosts
);

module.exports = router;
