const { Router } = require('express');
const router = Router();

const { getStatuses, getStatusById, createStatus, updateStatus, deleteStatus } = require('../../controllers/Table/status.controller');

router.get('/status', getStatuses);
router.get('/status/:id', getStatusById);
router.post('/status', createStatus);
router.delete('/status/:id', deleteStatus);
router.put('/status/:id', updateStatus);

module.exports = router;
