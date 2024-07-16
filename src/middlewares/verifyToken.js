const jwt = require('jsonwebtoken');

// verifyToken
  const  verifyToken = async (req, res, next) => {
        const authHeader = req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1]; 
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                const decode = jwt.decode(token)
                if (err) {
                    return res.status(401).json("Token is not valid");
                }
                res.userID = decode.id;
                next();
            });
        } else {
            return res.status(401).json("You are not authenticated, please login first");
        }
    }
module.exports = verifyToken