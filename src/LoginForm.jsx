// LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginform.css';

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate('/user');
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  return (
    <div className='login-container'>
      <h2 className='login-form-header'>Log In</h2>
      <div className='login-form-box'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="login-form-input"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="login-form-input"
            required
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;



