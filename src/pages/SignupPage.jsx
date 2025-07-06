import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!username || !fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setSuccess('');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess('');
      return;
    }

    setError('');
    setSuccess("Successfully registered!");

    // Store necessary details in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Show success modal
    setIsModalOpen(true);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/login'); // Redirect to login page after closing the modal
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
        onSubmit={handleSignUp}
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Sign Up</h1>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Choose a password"
                className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Register
        </motion.button>

        <Link to="/login" className="text-center text-green-500 hover:text-green-700 block mt-4">
          Already have an account? Log in
        </Link>
      </motion.form>

      {/* Modal for Success */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-center">Success!</h2>
            <p className="mt-4 text-center text-lg">You have successfully registered!</p>
            <div className="mt-6 flex justify-center">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={handleCloseModal}
              >
                Go to Login
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SignupPage;
