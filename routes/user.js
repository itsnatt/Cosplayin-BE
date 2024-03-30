const { Router} =  require('express');
const router = Router();

const { getUsers2, createUser2, getUserById2, deleteUser2, updateUser2 } = require('../controllers/user.controller');

router.get('/users2',getUsers2);
router.get('/users2/:id',getUserById2);
router.post('/users2',createUser2);
router.delete('/users2/:id',deleteUser2);
router.put('/users2/:id',updateUser2);

module.exports = router;