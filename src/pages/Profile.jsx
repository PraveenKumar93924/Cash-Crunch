import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedFullName = localStorage.getItem('fullName');
    
    setUsername(storedUsername || 'No Username');
    setEmail(storedEmail || 'No Email');
    setFullName(storedFullName || 'No Full Name');
  }, []);

  const handleGoBack = () => {
    navigate('/home'); 
  };

  const handleSaveProfileChanges = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('fullName', fullName);
    alert("Profile updated successfully.");
    setIsEditingProfile(false);
  };

  const handleChangePassword = () => {
    const storedPassword = localStorage.getItem('password');

    if (currentPassword !== storedPassword) {
      setPasswordChangeError("Current password is incorrect.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError("New passwords do not match.");
      return;
    }

    localStorage.setItem('password', newPassword);
    setPasswordChangeError('');
    alert("Password updated successfully.");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsChangingPassword(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleViewTransactions = () => {
    navigate('/transactions'); 
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-gray-800">Your Profile</h2>

      <div className="mt-4 w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-300">
        {isEditingProfile ? (
          <>
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mb-4"
            />
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleSaveProfileChanges} className="mt-4 w-full" color="primary">
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
            <Button onClick={() => setIsEditingProfile(true)} className="mt-4 w-full" color="primary">
              Edit Profile
            </Button>
          </>
        )}
      </div>

      <div className="mt-8 w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <Button onClick={() => setIsChangingPassword(!isChangingPassword)} className="w-full text-left text-gray-700">
          {isChangingPassword ? "Cancel Password Change" : "Change Password"}
        </Button>

        {isChangingPassword && (
          <div className="mt-4">
            {passwordChangeError && <p className="text-red-500 text-sm">{passwordChangeError}</p>}

            <div className="relative mb-4">
              <Input
                label="Current Password"
                type={showPassword.currentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('currentPassword')}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword.currentPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="relative mb-4">
              <Input
                label="New Password"
                type={showPassword.newPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword.newPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="relative mb-4">
              <Input
                label="Confirm New Password"
                type={showPassword.confirmNewPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmNewPassword')}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword.confirmNewPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <Button onClick={handleChangePassword} color="primary" className="mt-4 w-full">
              Change Password
            </Button>
          </div>
        )}
      </div>

      <Button
        color="secondary"
        onClick={handleGoBack}
        className="mt-8"
      >
        Back to Home
      </Button>

      <Button
        color="primary"
        onClick={handleViewTransactions}
        className="mt-4"
      >
        View Transactions
      </Button>
    </div>
  );
};

export default Profile;
