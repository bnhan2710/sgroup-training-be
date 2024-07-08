const userManagerService = require('../../services/userManage.service');

const create = async (req, res) => {
    try {
        const createdUser = await userManagerService.createUser(req.body);
        return res.status(createdUser.code).json(createdUser.message);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const update = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await userManagerService.updateUser(id, req.body);
        if(updatedUser){
            return res.status(updatedUser.code).json(updatedUser.message);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) =>{
    try {
        const id = req.params.id;
        const deleteuser = await userManagerService.deleteUser(id);
       return res.status(deleteuser.code).json(deleteuser.message   );
}catch(err){
    console.error(err);
    return res.status(500).json({message: "Internal server error"});
}}

const getUserById = async(req, res) => {
    try{
        const id = req.params.id;
        const getUserId = await userManagerService.getUserById(id);
        res.status(getUserId.code).json(getUserId.message);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
}

//Get User with Pagination

const getUserWithPagination = async(req,res) =>{
    try{
        const {page,pagesize} = req.body;
        const users = await userManagerService.getUserWithPagination(page,pagesize);
        res.status(users.code).json(users.message);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
} 

module.exports = {
    create,
    update,
    deleteUser,
    getUserById,
    getUserWithPagination,

}