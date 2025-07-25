import React, { useState } from 'react';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';


const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);

        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000,
          style: {
            borderRadius: '20px',
          }
        });
      } else {
        toast.error('Login failed!', {
          position: 'top-right',
          autoClose: 3000,
          style: {
            borderRadius: '20px',
          }
        });
      }
    } catch (err) {
      console.error('Error logging in:', err);
      toast.error('Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        style: {
          borderRadius: '20px',
        }
      });
    }
  };

  return (
    <div className="login-container animated-card">
      <h2>Welcome Back</h2>
      <p>Login using your credentials</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
       <Button
        type="submit"
        variant="contained"
        color="success"
        fullWidth
        sx={{ padding: '12px', fontSize: '16px', borderRadius: '6px' }}
      >
        Login
      </Button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Login;
