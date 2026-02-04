import { useNavigate } from 'react-router-dom';
import './Chat.css';

function Chat({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user-info">
          <img src={user.avatar} alt="avatar" className="avatar" />
          <div>
            <h3>{user.username}</h3>
            <span className="status-online">Online</span>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="chat-content">
        <div className="welcome-message">
          <h2>Welcome to Real-Time Chat!</h2>
          <p>Your login/signup functionality is ready.</p>
          <p>Start building your chat features here.</p>
        </div>
      </div>
    </div>
  );
}

export default Chat;
