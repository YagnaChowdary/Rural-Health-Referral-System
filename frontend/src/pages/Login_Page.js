/*import React, { useState } from 'react';
import api from '../services/api';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });

      // Step 1: Get the token from the response
      const { token } = res.data;

      // Step 2: Save the token in the browser's local storage
      localStorage.setItem('token', token);

      // Step 3: Redirect to the dashboard after successful login
      window.location.href = '/dashboard';
      alert('Login Successful!');

    } catch (err) {
      console.error(err.response.data);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
      <h2>User Login</h2>
      <input 
        type="email" 
        name="email" 
        value={email} 
        onChange={onChange} 
        placeholder="Email Address" 
        required 
      />
      <input 
        type="password" 
        name="password" 
        value={password} 
        onChange={onChange} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage; */

import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom'; // <-- 1. Import useNavigate and Link
import { jwtDecode } from 'jwt-decode'; // <-- 2. Import jwt-decode

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // <-- 3. Get the navigate function

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token } = res.data;

      // Step 1: Save the token
      localStorage.setItem('token', token);
      
      alert('Login Successful!');

      // Step 2: Decode the token to find the user's role
      const userPayload = jwtDecode(token);
      const role = userPayload.user.role;

      // Step 3: Navigate to the correct page based on role
      if (role === 'PHC_STAFF') {
        navigate('/');
      } else if (role === 'DISTRICT_STAFF') {
        navigate('/dashboard');
      } else {
        // Fallback for other roles (like ANO)
        navigate('/'); 
      }

    } catch (err) {
      console.error(err.response ? err.response.data : err);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2>User Login</h2>
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={onChange} 
          placeholder="Email Address" 
          required 
        />
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={onChange} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>

      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/register" style={{ color: '#61dafb' }}>Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
