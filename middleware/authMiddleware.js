import jwt from 'jsonwebtoken';
import { findUserById } from '../data/users.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token (exclude password)
            const user = findUserById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const { password, ...userWithoutPassword } = user;
            req.user = userWithoutPassword;

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
