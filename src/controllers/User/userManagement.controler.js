const userManagerService = require('../../services/userManage.service');

const create = async (req, res) => {

        const createdUser = await userManagerService.createUser(req.body);
        res.send(createdUser)

}

const update = async (req, res) => {
    const id = req.params.id;   
        const updatedUser = await userManagerService.updateUser(id, req.body);
        res.send(updatedUser)
}

const deleteUser = async (req, res) =>{
        const id = req.params.id;
        const deleteUser = await userManagerService.deleteUser(id);
        res.send(deleteUser)
}

const getUserById = async(req, res) => {
        const id = req.params.id;
        const getUserId = await userManagerService.getUserById(id);
        res.send({getUserId})
}


const getUserWithPagination = async(req,res) =>{
        const { page, size } = req.query;
        const users = await userManagerService.getUserWithPagination(page,size);
        res.send(users)
} 

module.exports = {
    create,
    update,
    deleteUser,
    getUserById,
    getUserWithPagination,

}