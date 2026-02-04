import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/chat" />} />
        <Route path="/signup" element={!user ? <Signup setUser={setUser} /> : <Navigate to="/chat" />} />
        <Route 
          path="/chat" 
          element={
            <PrivateRoute>
              <Chat user={user} setUser={setUser} />
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to={user ? "/chat" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
