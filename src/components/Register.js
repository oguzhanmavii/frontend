import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/register.css';
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { username, password });
      console.log(response.data);
      alert('User Saved successfully');
      console.log("user saved successfully!");
      window.location.reload();
    } catch (error) {
      console.error('Register error:', error);
    }
  };
  return (
    <div className="container">
      <h1>Register</h1>
      <div className="input-group">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="button" onClick={handleRegister}>Register</button>
      <Link to="/login" className="link">Already have an account? Login</Link>
    </div>
  );
};
export default Register;
