import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import LoadingSpinner from './LoadingSpinner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      setLoading(true);

      localStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        setLoading(false);
        navigate('/home');
      }, 2000);
    } else {
      alert('Incorrect email or password');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center h-screen"
    >
      <motion.form
        className="p-10 bg-white rounded-lg shadow-2xl max-w-md w-full space-y-6"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Login</h1>
        
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </motion.div>
        </div>

        <motion.button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out flex justify-center items-center" 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {loading ? <LoadingSpinner /> : 'Log In'}
        </motion.button>

        <Link to="/signup" className="text-center text-green-500 hover:text-green-700 block mt-4">
          Don't have an account? Sign up
        </Link>
      </motion.form>
    </motion.div>
  );
};

export default LoginPage;