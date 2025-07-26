import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Tasklist.css';

const TaskList = ({ token, logout }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (error) {
        toast.error('Failed to load tasks');
      }
    };

    fetchTasks();
  }, [token]);

  const addTask = async () => {
    if (!title.trim()) {
      toast.warning('Task title cannot be empty');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, res.data]);
      setTitle('');
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Error adding task');
    }
  };

  const updateTask = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        title: editTitle,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
      setEditId(null);
      setEditTitle('');
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Error updating task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(t => t._id !== id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  return (
    <div className="tasklist-container animated-card">
      <div className="task-header">
        <h2>{username ? `Welcome, ${username} 👋` : 'Your Tasks'}</h2> 
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
      <div className="task-input">
        <input
          type="text"
          value={title}
          placeholder="New Task"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item animate">
            {editId === task._id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <span className={task.completed ? 'completed' : ''}>{task.title}</span>
            )}
            <div className="task-actions">
              {editId === task._id ? (
                <button onClick={() => updateTask(task._id)}>Update</button>
              ) : (
                <button onClick={() => {
                  setEditId(task._id);
                  setEditTitle(task.title);
                }}>Edit</button>
              )}
              <button onClick={() => deleteTask(task._id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default TaskList;
