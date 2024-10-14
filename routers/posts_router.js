
const postsRouter = require("express").Router();
const { creatPost, editPost, deletePost, listPosts, commentOnPost, replyComment } = require("../controllers/posts_controllers");

postsRouter.post('/', creatPost);
postsRouter.put('/:postId', editPost);
postsRouter.delete('/:postId', deletePost);
postsRouter.get('/users', listPosts);
postsRouter.post('/comments', commentOnPost);
postsRouter.post('/comments/reply', replyComment);


module.exports = { postsRouter }