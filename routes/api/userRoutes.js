const router = require('express').Router();
const {users, login, me, deleteUser, addUser, updateUser} = require('../../controllers/userControllers');

router.route('/').get(users).post(addUser);

router.route('/login/:phone/:email/:password').get(login);

router.route('/:userId').get(me).put(updateUser).delete(deleteUser);



module.exports = router;
