
const jwt = require('jsonwebtoken')

//VERIFY TOKEN
function verifyToken(req, res, next) {
try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
    //GET THE TOKEN ONLY
    const token = bearerHeader.split(' ')[1];
    let verification = jwt.verify(token, 'youcantguessthis!');
        req.user = verification
        next();    
    }else{
        next({
            success: false,
            status: 401,
            message: "No token found!"
        });
    };
    } catch (error) {
        res.sendStatus(401);
    }

};

//error of undefine routes
function undefinedRoutesHandler(req, res) {
    res.json({
        success: false,
        message: "Wrong request!"
    })
}

//handle all errors
function errorHandler(err, req, res, next){
    res.sendStatus(err.status);
};

module.exports = { verifyToken, errorHandler, undefinedRoutesHandler }