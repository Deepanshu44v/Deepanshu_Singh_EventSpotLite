// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // decodeing jwt
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
// middleare for authenticating user because we have a feature where only login user can create event