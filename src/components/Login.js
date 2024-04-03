import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/todos';
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <div className="input-group">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="button" onClick={handleLogin}>Login</button>
    </div>
  );
};
export default Login;
