const { pool } = require("../configs/database");
const authService = require("../services/auth.service");

async function UserLogin(req,res){
    try{
        const user =  authService.loginService(req.body);
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(401).json({message: "Invalid credentials"});
        }   
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }

}

module.exports = {
    UserLogin
}