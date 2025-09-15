import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'job-seeker' });
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users', form);
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Registration failed');
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
        minHeight: '300px',
      }}
      className="p-6 card"
    >
      <div style={{ width: 'fit-content', margin: '0 auto' }}>
        <h1 className="text-2xl font-mono text-green-700 dark:text-green-300 mb-4 text-center">
          Create Your Account
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
          style={{ width: '200px', display: 'block', margin: '0 auto' }}
        />
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
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="p-2 border rounded"
          style={{ width: '200px', display: 'block', margin: '0 auto' }}
        >
          <option value="job-seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button
          type="submit"
          className="bg-olive-600 text-white p-2 rounded"
          style={{ width: '200px', display: 'block', margin: '0 auto' }}
        >
          Register
        </button>
      </form>

      {/* Back link under the form */}
      <div style={{ width: 'fit-content', margin: '0 auto', marginTop: '1rem' }}>
        <Link
          to="/login"
          className="text-green-700 hover:text-green-900 font-mono block text-center"
          style={{ fontSize: '10px' }}
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default Register;
