const router = require('express').Router();
const {users, addUser, login, me, updateUser, deleteUser} = require('../../controllers/userControllers');

router.route('/').get(users).post(addUser);

router.route('/login').post(login);

router.route('/:userId').get(me).put(updateUser).delete(deleteUser);



module.exports = router;
