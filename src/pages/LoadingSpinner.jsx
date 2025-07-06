import React from 'react';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin"></div>
    <span className="text-gray-700 text-lg">Please wait...</span>
  </div>
);

export default LoadingSpinner;
