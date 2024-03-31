const { Router } = require('express');
const router = Router();

const {    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser } = require('../../controllers/Table/user.controller');

router.get('/user', getUsers);
router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUser);

module.exports = router;
