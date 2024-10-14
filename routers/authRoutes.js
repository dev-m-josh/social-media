
const authRouters = require('express').Router();
const {  creatUserAccount, userLogin } = require('../controllers/users_controllers');

authRouters.post('/', creatUserAccount);
authRouters.post('/login', userLogin);

module.exports = { authRouters };