const router = require('express').Router();
const userManagerController = require("../controllers/User/userManagement.controler");
const cacheService = require('../utils/cache.service');
const knex = require('../configs/knexdb');

//CREATE USER
router.post('/create',userManagerController.create);

//UPDATE USER
router.put('/update/:id',userManagerController.update);

//DELETE USER
router.delete('/delete/:id',userManagerController.deleteUser);

//GET USER BY ID
router.get('/:id',userManagerController.getUserById);

//GET USER WITH PAGINATION
router.get('/',userManagerController.getUserWithPagination);

//Assign role to user
router.post('/:id/asign',async(req,res)=>{
    const userId = req.params.id;
    const {role_id} = req.body;
    try{
        const user = await knex('users').select('*').where('id',userId).first();
        if(!user){
            return res.status(404).json('User not found');
        }
        await knex('user_role').where('id_user',userId).del();
        await knex('user_role').insert({id_user:userId,role_id});
       const loginUser = await cacheService.getOneUser(userId);
         if(loginUser){
              await cacheService.setOneUser(userId);
         }
        return res.status(200).json('Role assigned to user successfully');

    }catch(err){
        console.error('Error assigning role to user:',err);
        res.status(500).json('Error assigning role to user');
    }
});

//Read user_role
router.get('/role/:id',async(req,res)=>{
    const userId = req.params.id;
    try{
        const userRole = await knex('user_role as ur')
        .select('u.username as username','r.role_name as role')
        .join('users as u','ur.id_user','u.id')
        .join('role as r','ur.role_id','r.id')
        .where('ur.id_user',userId);
        return res.status(200).json(userRole);
    }catch(err){
        console.error('Error getting user_role:',err);
        res.status(500).json('Error getting user_role');
    }
});
module.exports = router;
