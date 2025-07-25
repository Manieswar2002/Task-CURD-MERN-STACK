import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Register';
import TaskList from './components/TaskList';
import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <TaskList token={token} logout={() => {
                  localStorage.removeItem('token');
                  setToken(null);
                }} />
              ) : (
                <Login setToken={setToken} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
          <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Router>
  );
}


export default App;
