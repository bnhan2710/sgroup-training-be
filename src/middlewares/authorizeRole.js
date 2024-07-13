const jwt = require('jsonwebtoken');
const knex = require('../configs/knexdb');
const cacheService = require('../utils/cache.service');

const authorizeRole = (...allowedPermission) => {
       return async(req, res, next) => {
        const authHeader = req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1]; 
            jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
                if (err) {
                    return res.status(401).json("Token is not valid");
                }
                const decode = jwt.decode(token)
                const userCache = cacheService.getOneUser(decode.id);
                if(!userCache || !userCache.permissions) {
                    return res.status(403).json("You are not allowed to access this route");
                }
                const permissionArray = [...allowedPermission];
                const Result = userCache.permissions.map((permission) => permissionArray.includes(permission)).find((result) => result === true);
                if(!Result) {
                    return res.status(403).json("You are not allowed to access this route");
                }
                next();
            });
        } else {
            return res.status(401).json("You are not authenticated");
        }
    }

}


module.exports = { authorizeRole };