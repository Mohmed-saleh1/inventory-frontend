import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <span className="text-lg text-gray-700">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
