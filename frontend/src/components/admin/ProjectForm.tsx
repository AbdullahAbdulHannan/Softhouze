import React from 'react';
import { Save, X } from 'lucide-react';

type Props = {
  projectForm: any;
  setProjectForm: (form: any) => void;
  projectImageUploadType: 'link' | 'device';
  setProjectImageUploadType: (type: 'link' | 'device') => void;
  projectImageUploading: boolean;
  uploadToImgbb: (file: File) => Promise<string>;
  saveProject: () => void;
  resetProjectForm: () => void;
  isDark: boolean;
  editingItem: any;
  loadingProjects: boolean;
};

const ProjectForm: React.FC<Props> = ({ projectForm, setProjectForm, projectImageUploadType, setProjectImageUploadType, projectImageUploading, uploadToImgbb, saveProject, resetProjectForm, isDark, editingItem, loadingProjects }) => (
  <div className={`rounded-2xl p-8 transition-all duration-300 ${
    isDark 
      ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
      : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg'
  }`}>
    <div className="flex items-center justify-between mb-6">
      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{editingItem ? 'Edit Project' : 'Add New Project'}</h2>
      <button
        onClick={resetProjectForm}
        className={`transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
      >
        <X className="w-6 h-6" />
      </button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Project Title *</label>
          <input
            type="text"
            value={projectForm.title}
            onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="Enter project title"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Technologies (comma separated) *</label>
          <input
            type="text"
            value={projectForm.technologies}
            onChange={e => setProjectForm({ ...projectForm, technologies: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="React, Node.js, MongoDB"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Live URL *</label>
          <input
            type="url"
            value={projectForm.liveUrl}
            onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="https://project-demo.com"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>GitHub URL (optional)</label>
          <input
            type="url"
            value={projectForm.githubUrl}
            onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="https://github.com/username/repo"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Thumbnail *</label>
          <div className="flex items-center gap-4 mb-2">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                checked={projectImageUploadType === 'link'}
                onChange={() => setProjectImageUploadType('link')}
              />
              <span>Upload image through link</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                checked={projectImageUploadType === 'device'}
                onChange={() => setProjectImageUploadType('device')}
              />
              <span>Upload image from device</span>
            </label>
          </div>
          {projectImageUploadType === 'link' ? (
            <input
              type="url"
              value={projectForm.thumbnail}
              onChange={e => setProjectForm({ ...projectForm, thumbnail: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
              placeholder="https://example.com/image.jpg"
            />
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const url = await uploadToImgbb(file);
                      setProjectForm({ ...projectForm, thumbnail: url });
                    } catch (err) {
                      alert('Image upload failed.');
                    }
                  }
                }}
              />
              {projectImageUploading && <span className="text-xs text-blue-500">Uploading...</span>}
              {projectForm.thumbnail && <img src={projectForm.thumbnail} alt="Preview" className="h-20 mt-2 rounded" />}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Description *</label>
          <textarea
            value={projectForm.description}
            onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
            rows={8}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none resize-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="Detailed description of the project"
          />
        </div>
      </div>
    </div>
    <div className="flex space-x-4 mt-8">
      <button
        onClick={saveProject}
        className="bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 text-white"
        disabled={loadingProjects}
      >
        <Save className="w-5 h-5" />
        <span>{editingItem ? 'Update' : 'Save'} Project</span>
      </button>
      <button
        onClick={resetProjectForm}
        className={`px-6 py-3 rounded-xl font-semibold transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
        disabled={loadingProjects}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default ProjectForm; 