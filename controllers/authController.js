import jwt from 'jsonwebtoken';
import {
    findUserByEmail,
    findUserByUsername,
    findUserById,
    createUser,
    comparePassword
} from '../data/users.js';

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Validate username length
        if (username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters' });
        }

        // Check if user exists
        const emailExists = findUserByEmail(email);
        const usernameExists = findUserByUsername(username);

        if (emailExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        if (usernameExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Create user
        const user = await createUser({ username, email, password });

        if (user) {
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                token: generateToken(user.id)
            });
        } else {
            res.status(400).json({ message: 'Failed to create user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check for user
        const user = findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isPasswordMatch = await comparePassword(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        const user = findUserById(req.user.id);

        if (user) {
            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
