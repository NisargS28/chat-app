# Real-Time Chat Application - MERN Stack

A full-stack real-time chat application with authentication built using Express.js, React, and Node.js with **static in-memory authentication** (no database required).

## Features

- ✅ User Authentication (Login/Signup)
- ✅ JWT Token-based Authorization
- ✅ Password Hashing with bcrypt
- ✅ Beautiful and Responsive UI
- ✅ Real-time Messaging with Socket.io
- ✅ Protected Routes
- ✅ In-Memory Data Storage (No Database Required)
- ✅ Pre-configured Demo Users

## Project Structure

```
realtime-chat/
├── server.js              # Backend entry point
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── data/
│   └── users.js          # In-memory user storage
├── controllers/
│   └── authController.js # Authentication logic
├── middleware/
│   └── authMiddleware.js # JWT verification
├── routes/
│   ├── authRoutes.js     # Auth endpoints
│   └── messageRoutes.js  # Message endpoints
└── client/               # React frontend
    ├── package.json      # Frontend dependencies
    ├── vite.config.js    # Vite configuration
    ├── index.html        # HTML template
    └── src/
        ├── main.jsx      # React entry point
        ├── App.jsx       # Main app component
        ├── index.css     # Global styles
        ├── services/
        │   └── api.js    # API service
        └── pages/
            ├── Login.jsx      # Login component
            ├── Signup.jsx     # Signup component
            ├── Chat.jsx       # Chat component
            ├── Auth.css       # Auth page styles
            └── Chat.css       # Chat page styles
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

**Note:** No database installation required! This version uses in-memory storage.

## Installation

### 1. Install Backend Dependencies

```bash
cd d:\Nisarg.Doc\PDEU\Sem 6\AWT\realtime-chat
npm install
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Configure Environment Variables

Edit the `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realtime-chat
JWT_SECRET=your_secret_key_change_this
JWT_SECRET=your_secret_key_change_this
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a secure random string in production.

## Demo Users

The application comes with two pre-configured demo users:

1. **Demo User**
   - Email: `demo@example.com`
   - Password: `demo123`

2. **John**
   - Email: `john@example.com`
   - Password: `john123`

You can also create new users through the signup page!

### Start Backend Server (Terminal 1)

```bash
# From root directory
npm run dev
```

The backend will run on `http://localhost:5000`

### Start Frontend Dev Server (Terminal 2)

```bash
# From client directory
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
  - Body: `{ username, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
- `GET /api/auth/profile` - Get user profile (Protected)
  - Header: `Authorization: Bearer <token>`

### Messages

- `GET /api/messages/:userId` - Get messages with a user (Protected)
- `POST /api/messages` - Send a message (Protected)
  - Body: `{ receiver, content }`

## Features Overview

### Authentication System

1. **Signup Page** - Users can create an account with:
   - Username (min 3 characters)
   - Email (validated format)
   - Password (min 6 characters)
   - Password confirmation

2. **Login Page** - Users can login with:
   - Email
   - Password

3. **Security Features**:
   - Passwords are hashed using bcryptjs
   - JWT tokens for authentication
   - Protected routes on both frontend and backend
   - Token stored in localStorage
   - Automatic token attachment to requests

### User Interface

- Modern gradient design
- Responsive layout
- Smooth animations
- Form validation
- Error handling
- Loading states

## Technologies Used

### MongoDB\*\* - Database

- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **Socket.io** - Real-time communication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend

- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Socket.io-client** - Real-time client

## Next Steps

To extend this application, you can add:

1. User list and search functionality
2. One-on-one chat interface
3. Message history
4. Online/offline status
5. Typing indicators
6. File sharing
7. Group chats
8. Message notifications
9. Profile customization
10. Message read receipts

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- ChPort Already in Use
- Change the PORT in `.env`
- Kill the process using the port

### CORS Issues

- Ensure backend CORS is configured for frontend URL
- Check if both servers are running

### Data Persistence

- Data is stored in memory and will be lost on server restart
- To persist data, integrate a database like MongoDB later

MIT

## Author

Created for AWT (Advanced Web Technologies) course project
