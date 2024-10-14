
const authRouters = require('express').Router();
const {  creatUserAccount, userLogin } = require('../controllers/users_controllers');

authRouters.post('/users', creatUserAccount);
authRouters.post('/users/login', userLogin);

module.exports = { authRouters };