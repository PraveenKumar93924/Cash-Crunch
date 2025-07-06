import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      amount: 1000,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      transactionType: 'Online',
      transactionId: 'TXN123456789',
      status: 'Pending',
      passkey: null,
    },
    {
      id: 2,
      amount: 500,
      fromCurrency: 'EUR',
      toCurrency: 'USD',
      transactionType: 'Physical',
      transactionId: null,
      status: 'Pending',
      passkey: 'ndggelvk16',
    },
  ]);

  const [password, setPassword] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);
  const [showTransactionID, setShowTransactionID] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handlePasswordSubmit = (e, transaction) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('password');
    
    if (password !== storedPassword) {
      setPasswordError('Incorrect password.');
      return;
    }
    
    setPasswordError('');
    if (transaction.transactionType === 'Physical') {
      setShowPasskey(true);
    } else {
      setShowTransactionID(true);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy.");
    });
  };

  return (
    <div className="w-full h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800">Your Transactions</h2>

      <div className="mt-6 space-y-6">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <p><strong>Amount:</strong> {transaction.amount} {transaction.fromCurrency} to {transaction.toCurrency}</p>
            <p><strong>Transaction Type:</strong> {transaction.transactionType}</p>
            {transaction.transactionType === 'Physical' ? (
              <div>
                <p><strong>Passkey:</strong> {showPasskey ? transaction.passkey : '••••••••'}</p>
                {!showPasskey && (
                  <form onSubmit={(e) => handlePasswordSubmit(e, transaction)}>
                    <input
                      type="password"
                      placeholder="Enter your password to view"
                      className="mt-2 px-3 py-2 border border-gray-300 rounded-md"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  </form>
                )}
                {passwordError && <p className="text-red-500">{passwordError}</p>}
                {showPasskey && (
                  <button
                    onClick={() => handleCopy(transaction.passkey)}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Copy Passkey
                  </button>
                )}
              </div>
            ) : (
              <div>
                <p><strong>Transaction ID:</strong> {showTransactionID ? transaction.transactionId : '••••••••••••'}</p>
                {!showTransactionID && (
                  <form onSubmit={(e) => handlePasswordSubmit(e, transaction)}>
                    <input
                      type="password"
                      placeholder="Enter your password to view"
                      className="mt-2 px-3 py-2 border border-gray-300 rounded-md"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  </form>
                )}
                {passwordError && <p className="text-red-500">{passwordError}</p>}
                {showTransactionID && (
                  <button
                    onClick={() => handleCopy(transaction.transactionId)}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Copy Transaction ID
                  </button>
                )}
              </div>
            )}
            <p><strong>Status:</strong> {transaction.status}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/profile")}
        className="mt-8 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Back to Profile
      </button>
    </div>
  );
};

export default TransactionsPage;
