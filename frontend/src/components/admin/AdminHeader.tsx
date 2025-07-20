import React from 'react';

const AdminHeader: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <div className={`border-b py-6 transition-colors duration-300 ${
    isDark 
      ? 'bg-gray-800 border-blue-900/30' 
      : 'bg-gray-50 border-blue-200/30'
  }`}>
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <h1 className="text-3xl font-bold">
        Admin 
        <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Dashboard</span>
      </h1>
      <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage your blog posts and portfolio projects</p>
    </div>
  </div>
);

export default AdminHeader; 