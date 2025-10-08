import React, { useState } from 'react';
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

export default LoginPage;