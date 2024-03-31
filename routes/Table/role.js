const { Router } = require('express');
const router = Router();

const { getRoles,
        getRoleById,
        createRole,
        updateRole,
        deleteRole } = require('../../controllers/Table/role.controller');

router.get('/role', getRoles);
router.get('/role/:id', getRoleById);
router.post('/role', createRole);
router.delete('/role/:id', deleteRole);
router.put('/role/:id', updateRole);

module.exports = router;
