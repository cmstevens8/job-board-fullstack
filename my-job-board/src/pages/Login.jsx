import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', form);

      const loggedInUser = {
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        id: res.data.id
      };

      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('token', res.data.access_token);

      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '450px',
        minHeight: '250px',
      }}
      className="p-6 card"
    >
      <div style={{ width: 'fit-content', margin: '0 auto' }}>
        <h1 className="text-2xl font-mono text-green-700 dark:text-green-300 mb-4">
          Hello Again!
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="p-2 border rounded"
          style={{ width: '200px', display: 'block', margin: '0 auto' }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="p-2 border rounded"
          style={{ width: '200px', display: 'block', margin: '0 auto' }}
        />
        <button
          type="submit"
          className="bg-olive-600 text-white p-2 rounded"
          style={{ width: '200px', display: 'block', margin: '0 auto' }}
        >
          Login
        </button>
      </form>

      <div style={{ width: 'fit-content', marginLeft: '132px', marginTop: '1rem' }}>
        <Link
          to="/register"
          className="text-green-700 hover:text-green-900 font-mono block text-center"
          style={{ fontSize: '10px' }}
        >
          Don’t have an account? Create one here
        </Link>
      </div>
    </div>
  );
};

export default Login;
