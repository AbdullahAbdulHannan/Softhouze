import React from 'react';
import { FileText, Briefcase } from 'lucide-react';

type Props = {
  activeTab: 'blogs' | 'projects';
  setActiveTab: (tab: 'blogs' | 'projects') => void;
  blogsCount: number;
  projectsCount: number;
  isDark: boolean;
};

const AdminTabNav: React.FC<Props> = ({ activeTab, setActiveTab, blogsCount, projectsCount, isDark }) => (
  <div className={`border-b transition-colors duration-300 ${
    isDark 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-gray-50 border-gray-200'
  }`}>
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <div className="flex space-x-8">
        <button
          onClick={() => setActiveTab('blogs')}
          className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'blogs'
              ? 'border-[#218EF2] text-[#218EF2]'
              : isDark 
                ? 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
          }`}
        >
          <FileText className="w-5 h-5 inline mr-2" />
          Blog Posts ({blogsCount})
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'projects'
              ? 'border-[#218EF2] text-[#218EF2]'
              : isDark 
                ? 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
          }`}
        >
          <Briefcase className="w-5 h-5 inline mr-2" />
          Projects ({projectsCount})
        </button>
      </div>
    </div>
  </div>
);

export default AdminTabNav; 