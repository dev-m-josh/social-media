
const sql = require("mssql");
const { newPostSchema, postEditSchema, postCommentSchema, replyCommentSchema } = require('../validators/validator');

//create posts
function creatPost(req, res) {
    let post = req.body;

    const {error, value} = newPostSchema.validate(post, {abortEarly:false});
    if (error) {
        console.log(error);
        res.json({
            success: false,

            error
        });
        return;
    };

    new sql.Request().query(`INSERT INTO posts(user_id, post_content)
        VALUES('${value.user_id}', '${value.post_content}')`, (err, result)=>{

            //catch error
            //if the user passed is not available
            if (err) {
                console.log("Error occured in query", err.message);
                let response = err.message.split('.')[0]
                console.log(response)
                res.json({
                    success: false,
                    message: response
                });
                return
            };

            //if any column is missing
            if (err) {
                console.log("Error occured in query", err.message);
                let response = err.message.split('.')[3]
                res.json({
                    success: false,
                    message: response
                });
            }else{
                res.json({
                    success: true,
                    message: "Post created successfully",
                    rowsAffected: result.rowsAffected
                });
            };
        });
};
//edit posts
function editPost(req, res) {
    let postToEdit = req.params.postId;
    let editDetails = req.body;

    //validate
    const {error, value} = postEditSchema.validate(editDetails, {abortEarly: false});

    if (error) {
        console.log(error);
        res.json({
            success: false,
            error:error.message
        });
        return;
    };

    new sql.Request().query(`UPDATE posts SET post_content = '${editDetails}' WHERE post_id = ${postToEdit}`, (err, result)=>{

        if (err) {
            console.log("Error occured in query", err.message);
            res.json({
                success: false,
                message: "log to see error!"
            })
        }else{
            res.json({
                success: true,
                message: "Edit was successfully done.",
                rowsAffected: result.rowsAffected
            });
        };
    });
};

//delete post
function deletePost(req, res) {
    let postToDelete = req.params.postId;

    new sql.Request().query(`DELETE FROM posts WHERE post_id = ${postToDelete}`, (err, result)=>{

        //ERROR CHECK
        if (err) {
            console.log("error occured in query", err ); 
        }else{
            res.json({
                success: true,
                message: "User deleted successfully!",
                result: result.rowsAffected
            });
        };
              
    });
};

//list posts to a user
function listPosts(req, res) {
    let { page, pageSize} = req.query;
    let offset = (Number(page)-1) * Number(pageSize);

    new sql.Request().query(`SELECT 
    p.user_id,
    u.user_name,
    p.post_id, 
    u.profile_picture, 
    p.post_content,
    p.date_posted
FROM 
    posts p
JOIN 
    users u ON p.user_id = u.user_id
ORDER BY date_posted DESC OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`, (err, result)=>{
    if (err) {
        console.log("error occured in query", err );
    }else{
        res.json(result.recordset)
    };
 });
};


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


module.exports = { creatPost, editPost, deletePost, listPosts, commentOnPost, replyComment };
