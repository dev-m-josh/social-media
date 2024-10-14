
const commentsRouter = require('express').Router();
const { commentOnPost, replyComment } = require('../controllers/comments_controllers');

commentsRouter.post('/comments', commentOnPost);
commentsRouter.post('/comments/reply', replyComment);

module.exports = { commentsRouter };