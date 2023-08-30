const express = require('express');
const { signUp, signIn, searchUser } = require('../controllers/userController');
const verifyUser = require('../middleware/auth');
const router = express.Router();

router.route('/signup')
  .post(signUp);

router.route('/signin')
  .post(signIn);

router.route("/search-user")
  .post(verifyUser, searchUser);

module.exports = router;