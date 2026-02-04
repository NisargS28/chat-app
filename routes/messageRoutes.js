import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// In-memory message storage
const messages = [];

// Get messages between two users
router.get('/:userId', protect, async (req, res) => {
    try {
        const userMessages = messages.filter(msg =>
            (msg.sender === req.user.id && msg.receiver === req.params.userId) ||
            (msg.sender === req.params.userId && msg.receiver === req.user.id)
        ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        res.json(userMessages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Send a message
router.post('/', protect, async (req, res) => {
    try {
        const { receiver, content } = req.body;

        const message = {
            id: String(messages.length + 1),
            sender: req.user.id,
            receiver,
            content,
            read: false,
            createdAt: new Date()
        };

        messages.push(message);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
