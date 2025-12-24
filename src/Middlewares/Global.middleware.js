import jwt from 'jsonwebtoken';
import User from '../Models/User.register.model.js';

export async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({
                message: "User is not authenticated"
            });
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);

        const {_id, email} = decoded;

        const user = await User.findById(_id).select('-password');
        
        if(!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}