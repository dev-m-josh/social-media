
const userRouter = require('express').Router();
const {  getAllUsers, deleteAccount, editUser } = require('../controllers/users_controllers');

userRouter.get('/users', getAllUsers);
userRouter.delete('/users/:userId', deleteAccount);
userRouter.put('/users/:userId', editUser);

module.exports = { userRouter }