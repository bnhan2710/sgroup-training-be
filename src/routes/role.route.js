const router = require('express').Router();
const roleController = require('../controllers/role.controller');

// ASSIGN ROLE TO USER
router.post('/assign-role/:id', roleController.assignRoleToUser);

// GET ROLE OF USER
router.get('/get-role/:id', roleController.getUserRole);

// GET ALL ROLE PERMISSION
router.get('/:id', roleController.getRolePermission);

// CREATE ROLE
router.post('/', roleController.createRole);

// CREATE PERMISSION
router.post('/permission', roleController.createPermission);

// ASSIGN PERMISSION TO ROLE
router.post('/assign/:id', roleController.assignPermissionToRole);

// REMOVE PERMISSION FROM ROLE
router.delete('/remove/:id', roleController.removePermissionFromRole);

module.exports = router;