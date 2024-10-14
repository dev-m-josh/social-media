
const postsRouter = require("express").Router();
const { creatPost, editPost, deletePost, listPosts } = require("../controllers/posts_controllers");

postsRouter.post('/posts', creatPost);
postsRouter.put('/posts/:postId', editPost);
postsRouter.delete('/posts/:postId', deletePost);
postsRouter.get('/posts/users', listPosts)


module.exports = { postsRouter }