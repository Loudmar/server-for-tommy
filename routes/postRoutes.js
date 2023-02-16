const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(postController.getPosts)
    .post(verifyJWT, postController.createPost)

router.route('/:id')
    .get(postController.getPost)
    .put(verifyJWT, postController.updatePost)
    .delete(verifyJWT, postController.deletePost);

module.exports = router;