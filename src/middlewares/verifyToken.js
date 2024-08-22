const jwt = require('jsonwebtoken');
const moment = require('moment');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token;
    
    if (authHeader) {
        const token = authHeader.split(" ")[1]; 

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {

                    return res.status(401).json("Token has expired, please login again");
                }
                console.log("Token Verification Error:", err.message);
                return res.status(401).json("Token is not valid");
            }

            const decoded = jwt.decode(token);
            console.log("Decoded Token:", decoded);
            
           
            req.userID = decoded.id;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated, please login first");
    }
};

module.exports = verifyToken;