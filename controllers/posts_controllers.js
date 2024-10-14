
const sql = require("mssql");
const { newPostSchema, postEditSchema } = require('../validators/validator');

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

module.exports = { creatPost, editPost, deletePost, listPosts };
