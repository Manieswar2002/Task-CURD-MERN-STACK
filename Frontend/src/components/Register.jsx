
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.css';
import Button from '@mui/material/Button';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();


    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.warning('Password must be at least 6 characters, include 1 uppercase letter and 1 special character.', {
        position: 'top-right',
        autoClose: 4000,
      });
      return;
    }

    try {
      const res = await fetch('https://task-curd-mern-stack.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        toast.success('Registration successful! Please log in.', {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        const data = await res.json();
        toast.error(data.error || 'Registration failed!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error('Something went wrong. Try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="register-container animated-card">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome</h2>
        <p>Create an account with your details</p>
        <form onSubmit={handleRegister}>
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full p-2 mb-4 border rounded"
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
            Register
          </Button>
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account? <a href="/" className="text-blue-500 underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;




