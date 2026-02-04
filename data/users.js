import bcrypt from 'bcryptjs';

// Static user storage
const users = [];

// Pre-define some demo users with hashed passwords
const initializeUsers = async () => {
    const demoUsers = [
        {
            id: '1',
            username: 'demo',
            email: 'demo@example.com',
            password: 'demo123',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
        },
        {
            id: '2',
            username: 'john',
            email: 'john@example.com',
            password: 'john123',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
        }
    ];

    for (const user of demoUsers) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        users.push({
            ...user,
            password: hashedPassword
        });
    }
};

// Initialize demo users
await initializeUsers();

// User operations
export const findUserByEmail = (email) => {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const findUserByUsername = (username) => {
    return users.find(user => user.username.toLowerCase() === username.toLowerCase());
};

export const findUserById = (id) => {
    return users.find(user => user.id === id);
};

export const createUser = async (userData) => {
    const { username, email, password } = userData;

    // Check if user already exists
    if (findUserByEmail(email) || findUserByUsername(username)) {
        return null;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate new ID based on the highest existing ID
    const maxId = users.length > 0
        ? Math.max(...users.map(u => parseInt(u.id) || 0))
        : 0;

    // Create new user
    const newUser = {
        id: String(maxId + 1),
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        createdAt: new Date()
    };

    users.push(newUser);
    return newUser;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export const getAllUsers = () => {
    return users.map(({ password, ...user }) => user);
};
