
const sql = require("mssql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { newUserAccountSchema, loginSchema } = require('../validators/validator');

//USER CREAT ACCOUNT
function creatUserAccount(req, res) {
    let userDetails = req.body;

    //validate
    const {error, value} = newUserAccountSchema.validate(userDetails, {abortEarly: false});
    if (error) {
        console.log(error);
        res.json({
            success: false,
            error
        });
        return;
    };

    new sql.Request().query(`INSERT INTO users(user_name, profile_picture, user_email, user_password)
        VALUES( '${value.user_name}', '${value.profile_picture}', '${value.user_password}', '${value.user_password}')`, (err, result)=>{

            //catch error
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
                    message: "User added successfully"
                });
            };
        });
};

//USER LOGIN
async function userLogin(req, res) {
    let userDetails = req.body;

//validate
const {error, value} = loginSchema.validate(userDetails, {abortEarly: false});
if (error) {
    console.log(error);
    let errorDetails = error.details;
    res.json({
        errorDetails
    });
    return;
};

    //let encryptPassword = await bcrypt.hash(userDetails.user_password, 5)
    //console.log(encryptPassword);

    let requestedUser = await new sql.Request().query(`select user_name, user_email, user_password from  users where user_email = '${value.user_email}'`)

    let user = requestedUser.recordset[0];

    //RESPONSE IF USER NOT FOUND
    if (!user) {
        res.json({
            success: false,
            message: "User not found!"
        });
        return;
    };

    //GET TOKEN
    let token = jwt.sign({user}, "youcantguessthis!");

    try {
        let passwordCompare = await bcrypt.compare(userDetails.user_password, user.user_password);
        if (passwordCompare) {
            res.json({
                Message:'logged successfully',
                token
            });
        }else{
            res.json({
                Message:'Wrong creditials!'
            });
        };
    } catch (error) {
        res.status(500).json(error,{
            Message:'Internal sever error!'
        });
    }


};

//GET ALL USERS
function getAllUsers(req, res) {
    let { page, pageSize} = req.query;
    let offset = (Number(page)-1) * Number(pageSize);
    
    new sql.Request().query(`SELECT * FROM users ORDER BY user_id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`, (err, result)=>{
        if (err) {
            console.log("error occured in query", err );
        }else{
            res.json(result.recordset)
        };
    });
};

//DELETE ACCOUNT
function deleteAccount(req, res) {
    let requestedUser = req.params.userId;

    new sql.Request().query(`DELETE FROM users WHERE user_id = ${requestedUser}`, (err, result)=>{
        
        //ERROR CHECK
        if (err) {
            console.log("error occured in query", err ); 
        };
        
        //RESPONSE
        res.json({
            success: true,
            message: "User deleted successfully!",
            result: result.rowsAffected
        });
    });
};

//EDIT USER DETAILS
function editUser(req, res) {
    let userToEdit = req.params.userId;
    let editDetails = req.body;

    new sql.Request().query(`UPDATE users SET user_name = '${editDetails.user_name}', profile_picture = '${editDetails.profile_picture}', user_email = '${editDetails.user_email}', user_password = '${editDetails.user_password}' WHERE user_id = ${userToEdit}`, (err, result)=>{

    //RESPONSE
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
                message: "Edit was successfully done.",
                rowsAffected: result.rowsAffected
            });
        };
    });
};

module.exports = { creatUserAccount, getAllUsers, deleteAccount, editUser, userLogin }