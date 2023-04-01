const router = require('express').Router();
const { createUser, getUserInfo } = require('../controllers/userController');

router.post('/', createUser);
router.get('/:user_id', getUserInfo);

module.exports = router;
