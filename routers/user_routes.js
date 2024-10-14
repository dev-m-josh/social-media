
const userRouter = require('express').Router();
const {  getAllUsers, deleteAccount, editUser } = require('../controllers/users_controllers');

userRouter.get('/', getAllUsers);
userRouter.delete('/:userId', deleteAccount);
userRouter.put('/:userId', editUser);

module.exports = { userRouter }