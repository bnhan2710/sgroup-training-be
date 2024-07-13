const router = require('express').Router();
const knex = require('../configs/knexdb');

//Read role_permission
router.get('/:id', async (req, res) => {
    const roleId = req.params.id;
    try {
        const rolePermission = await knex('role_permission as rp')
            .select('r.role_name as role', 'p.permission_name as permission')
            .join('role as r', 'rp.role_id', 'r.id')
            .join('permission as p', 'rp.permission_id', 'p.id')
            .where('rp.role_id', roleId);
        return res.status(200).json(rolePermission);
    } catch (error) {
        console.error('Error getting role_permission:', error);
        res.status(500).json('Error getting role_permission');
    }
});

//Create role
router.post('/', async (req, res) => {
    const { role_name } = req.body;
    try {
        await knex('role').insert({ role_name });
        return res.status(200).json('Role created successfully');
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json('Error creating role');
    }
});

//Create permission
router.post('/permission', async (req, res) => {
    const { permission_name } = req.body;
    try {
        await knex('permission').insert({ permission_name });
        return res.status(200).json('Permission created successfully');
    } catch (error) {
        console.error('Error creating permission:', error);
        res.status(500).json('Error creating permission');
    }
});

//Assign permission to role
router.post('/:id/assign', async (req, res) => {
    const { role_id, permission_id } = req.body;
    try {
        await knex('role_permission').insert({ role_id, permission_id });
        return res.status(200).json('Permission assigned to role successfully');
    } catch (error) {
        console.error('Error assigning permission to role:', error);
        res.status(500).json('Error assigning permission to role');
    }
});

//Remove permission from role
router.delete('/:id/remove', async (req, res) => {
    const { role_id, permission_id } = req.body;
    try {
        await knex('role_permission').where({ role_id, permission_id }).del();
        return res.status(200).json('Permission removed from role successfully');
    } catch (error) {
        console.error('Error removing permission from role:', error);
        res.status(500).json('Error removing permission from role');
    }
});

module.exports = router;