const knex = require('../configs/knexdb');
const cacheService = require('../services/cache.service');

// Assign role to user
const assignRoleToUser = async (req, res) => {
    const userId = req.params.id;
    const { role_id } = req.body;
    try {
        const user = await knex('users').select('*').where('id', userId).first();
        if (!user) {
            return res.status(404).json('User not found');
        }
        await knex('user_role').where('user_id', userId).del();
        await knex('user_role').insert({ user_id: userId, role_id });
        const loginUser = await cacheService.getOneUser(userId);
        if (loginUser) {
            await cacheService.setOneUser(userId);
        }
        return res.status(200).json('Role assigned to user successfully');
    } catch (err) {
        console.error('Error assigning role to user:', err);
        res.status(500).json('Error assigning role to user');
    }
};

// Read user_role
const getUserRole = async (req, res) => {
    const userId = req.params.id;
    try {
        const userRole = await knex('user_role as ur')
            .select('u.username as username', 'r.role_name as role')
            .join('users as u', 'ur.user_id', 'u.id')
            .join('role as r', 'ur.role_id', 'r.id')
            .where('ur.user_id', userId);
        return res.status(200).json(userRole);
    } catch (err) {
        console.error('Error getting user_role:', err);
        res.status(500).json('Error getting user_role');
    }
};

// Read role_permission
const getRolePermission = async (req, res) => {
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
};

// Create role
const createRole = async (req, res) => {
    const { role_name } = req.body;
    try {
        await knex('role').insert({ role_name });
        return res.status(200).json('Role created successfully');
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json('Error creating role');
    }
};

// Create permission
const createPermission = async (req, res) => {
    const { permission_name } = req.body;
    try {
        await knex('permission').insert({ permission_name });
        return res.status(200).json('Permission created successfully');
    } catch (error) {
        console.error('Error creating permission:', error);
        res.status(500).json('Error creating permission');
    }
};

// Assign permission to role
const assignPermissionToRole = async (req, res) => {
    const role_id = req.params.id;
    const { permission_id } = req.body;
    try {
        await knex('role_permission').insert({ role_id, permission_id });
        return res.status(200).json('Permission assigned to role successfully');
    } catch (error) {
        console.error('Error assigning permission to role:', error);
        res.status(500).json('Error assigning permission to role');
    }
};

// Remove permission from role
const removePermissionFromRole = async (req, res) => {
    const { role_id, permission_id } = req.body;
    try {
        await knex('role_permission').where({ role_id, permission_id }).del();
        return res.status(200).json('Permission removed from role successfully');
    } catch (error) {
        console.error('Error removing permission from role:', error);
        res.status(500).json('Error removing permission from role');
    }
};

module.exports = {
    assignRoleToUser,
    getUserRole,
    getRolePermission,
    createRole,
    createPermission,
    assignPermissionToRole,
    removePermissionFromRole
}