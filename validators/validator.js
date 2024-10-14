
const joi = require("joi");

const newUserAccountSchema = joi.object({
    user_name: joi.string().required(),
    user_email: joi.string().email().required(),
    user_password: joi.string().required()
});

//LOGIN SCHEMA
const loginSchema = joi.object({
    user_email: joi.string().required(),
    user_password: joi.string().min(8).max(64).required()
});

//CREAT POST SCHEMA
const newPostSchema = joi.object({
    user_id: joi.number().required(),
    post_content: joi.string().required()
});

//POST EDIT SCHEMA
const postEditSchema = joi.object({
    post_content: joi.string().required()
});

//COMMENT ON A POST SCHEMA
const postCommentSchema = joi.object({
    post_id: joi.number().required(),
    user_id: joi.number().required(),
    comment_content:joi.string().required()
});

//REPLY COMMENT SCHEMA
const replyCommentSchema = joi.object({
    comment_id: joi.number().required(),
    user_id: joi.number().required(),
    reply_content: joi.string().required()
});

module.exports = { newUserAccountSchema, loginSchema, newPostSchema, postEditSchema, postCommentSchema, replyCommentSchema };