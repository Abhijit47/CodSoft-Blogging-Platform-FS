const express = require('express');
const {
  createPost, allPost, myPost, commentOnePost, getOnePost
} = require('../controllers/postController');
const verifyUser = require('../middleware/auth');

const router = express.Router();

router.route('/createpost')
  .post(verifyUser, createPost);

router.route('/allpost')
  .get(allPost);

router.route('/mypost')
  .get(verifyUser, myPost);

router.route('/comment')
  .put(verifyUser, commentOnePost);

router.route('/post/:id')
  .get(verifyUser, getOnePost);

module.exports = router;