// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            
            // 1. Verify the signature
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 2. Fetch the user document
            req.user = await User.findById(decoded.id).select('-password');
            
            // 3. CRITICAL: If the user was deleted but the token is still active
            if (!req.user) {
                return res.status(401).json({ message: 'User no longer exists in Foundation' });
            }
            
            return next(); // Lift the request to the Controller Layer
        }
        res.status(401).json({ message: 'No passport provided' });
    } catch (error) {
        // Converts a 500 Foundation Crash into a 401 response
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = { protect };