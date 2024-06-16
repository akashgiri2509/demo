const express = require('express');
const roleController = require('../controllers/roleController');
const router = express.Router();

router.get('/roles', roleController.getAllRole);
router.get('/roles/:id', roleController.getRoleById);
router.post('/roles', roleController.createRole);
router.put('/roles/:id', roleController.updateuser);
router.delete('/roles/:id', roleController.deleteRole);

module.exports = router;
