import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OnlinePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [transactionID, setTransactionID] = useState("");

  useEffect(() => {
    // Generate a random transaction ID when the component mounts
    const generateTransactionID = () => {
      return Math.random().toString(36).substring(2, 15).toUpperCase(); // Random 12-character ID
    };
    
    setTransactionID(generateTransactionID());
  }, []);

  const handleCopy = () => {
    if (transactionID) {
      navigator.clipboard.writeText(transactionID).then(() => {
        alert("Transaction ID copied to clipboard!");
      }).catch(() => {
        alert("Failed to copy transaction ID.");
      });
    }
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Navigates to the profile page
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Poppins, sans-serif',
      position: 'relative', // Ensure profile button doesn't overlap with content
    }}>
      {/* Profile Button */}
      <button 
        onClick={handleProfileClick} 
        style={{
          position: 'fixed', 
          top: '20px', 
          right: '20px', 
          padding: '10px 20px', 
          fontSize: '1rem', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          zIndex: '10', // Ensure button is above other content
        }}
      >
        Profile
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          padding: '20px',
          background: '#f8f8f8',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>
          Your Payment is Successful!
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            padding: '20px',
            background: '#f2f2f2',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p style={{ fontSize: '1.5rem', color: '#333' }}>
            Your Transaction ID: <strong>{transactionID}</strong>
          </p>
          <button 
            onClick={handleCopy}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Copy Transaction ID
          </button>
        </motion.div>
        
        <p style={{ marginTop: '20px', fontSize: '1.5rem', color: '#555' }}>
          Money will be credited to your account within 24 hours.
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            padding: '20px',
            background: '#f8f8f8',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            marginTop: '40px',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', color: '#333' }}>
            Have questions? Feel free to reach out to our support team.
          </h2>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OnlinePayment;
