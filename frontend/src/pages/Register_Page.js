import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'PHC_STAFF', // Default role, can be changed
    hospital_id: 1, // Default hospital ID, can be changed
  });
  const navigate = useNavigate();

  const { name, email, password, role, hospital_id } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async e => {
    e.preventDefault();
    try {
      // Use the register endpoint from your authController
      await api.post('/auth/register', { name, email, password, role, hospital_id });

      alert('Registration Successful! Please log in.');
      // Redirect to the login page after successful registration
      navigate('/login');

    } catch (err) {
      console.error(err.response ? err.response.data : err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
      <h2>Sign Up</h2>
      <input 
        type="text" 
        name="name" 
        value={name} 
        onChange={onChange} 
        placeholder="Full Name" 
        required 
      />
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
      
      {/* Basic dropdown for role selection. You can customize this. */}
      <select name="role" value={role} onChange={onChange}>
        <option value="PHC_STAFF">PHC Staff</option>
        <option value="DISTRICT_STAFF">District Staff</option>
         <option value="ANO">ANO</option>
      </select>

      {/* Basic input for hospital ID. You might want a dropdown here later. */}
      <input 
        type="number" 
        name="hospital_id" 
        value={hospital_id} 
        onChange={onChange} 
        placeholder="Hospital ID (e.g., 1 for PHC, 2 for District)" 
        required 
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
