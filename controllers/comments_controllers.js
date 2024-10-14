
const sql = require("mssql");
const { postCommentSchema, replyCommentSchema } = require('../validators/validator')

//comment on post
function commentOnPost(req, res) {
    let commentDetails = req.body;

    const { error, value} = postCommentSchema.validate(commentDetails, {abortEarly: false});
    if (error) {
        console.log("Something went wrong!", error);
        res.json({
            success: false,
            error: error.details
        });
        return
    };
    new sql.Request().query(`INSERT INTO comments(post_id, user_id, comment_content)
        VALUES('${value.post_id}', '${value.user_id}', '${value.comment_content}')`, (err, result)=>{

            if (err) {
                console.log("Error occured in query!", err);
            } else {
              res.json({
                success: true,
                message: "Comment send successfully",
                rowsAffected: result.rowsAffected
              });  
            };

        });
};

//reply to comments
function replyComment(req, res) {
    let replyDetails = req.body;

    const { error, value } = replyCommentSchema.validate(replyDetails, {abortEarly: false});
    if (error) {
        console.log("Something hapenned!", error);
        res.json({
            success: false,
            error: error.details
        });
        return
    };

    new sql.Request().query(`INSERT INTO comment_replies(comment_id, user_id, reply_content)
    VALUES('${value.comment_id}', '${value.user_id}', '${value.reply_content}')`, (err, result)=>{

        if (err) {
            console.log("Error occured in query!", err);
        } else {
          res.json({
            success: true,
            message: "Reply send successfully",
            rowsAffected: result.rowsAffected
          });  
        };
    });
};

module.exports = { commentOnPost, replyComment };