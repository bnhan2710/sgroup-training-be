function validateUser(req, res, next) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Missing required fields: name, email, password' });
    }
    next();
}
module.exports= validateUser;