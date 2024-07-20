const expireCache = require('expire-cache');
const knex = require('../configs/knexdb');

class CacheService {
    setOneUser = async (userId) => {
        try {
            const rolePermission = await knex('role as r')
                .select('r.id as role', 'r.role_name as role_name', 'p.permission_name as permission')
                .join('user_role as ur', 'r.id', 'ur.role_id')
                .leftJoin('role_permission as rp', 'r.id', 'rp.role_id')
                .leftJoin('permission as p', 'rp.permission_id', 'p.id')
                .where('ur.user_id', userId);
            // Extract unique roles
            const roles = Array.from(new Set(rolePermission.map(role => role.role)));
            // Extract unique permissions
            const permissions = Array.from(new Set(rolePermission.filter(role => role.permission).map(role => role.permission)));
            // Set cache
            const userCache = expireCache.namespace('userCache');
            userCache.set(userId, { roles, permissions }, process.env.JWT_EXPIRE_TIME);

            console.log(`User ${userId} roles and permissions cached successfully.`);
        } catch (error) {
            console.error(`Error setting roles and permissions for user ${userId}:`, error);
        }
    }

    getOneUser = async (userId) => {
        try {
            const userCache = expireCache.namespace('userCache');
            const cachedData = userCache.get(userId);
            if (cachedData) {
                return cachedData;
            } else {
                await this.setOneUser(userId);
                return userCache.get(userId);
            }
        } catch (error) {
            console.error(`Error getting roles and permissions for user ${userId}:`, error);
            return null;
        }
    }
}

module.exports = new CacheService();
