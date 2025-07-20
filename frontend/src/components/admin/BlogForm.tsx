import React from 'react';
import { Save, X } from 'lucide-react';

type Props = {
  blogForm: any;
  setBlogForm: (form: any) => void;
  blogImageUploadType: 'link' | 'device';
  setBlogImageUploadType: (type: 'link' | 'device') => void;
  blogImageUploading: boolean;
  uploadToImgbb: (file: File) => Promise<string>;
  saveBlog: () => void;
  resetBlogForm: () => void;
  isDark: boolean;
  editingItem: any;
  loadingBlogs: boolean;
};

const BlogForm: React.FC<Props> = ({ blogForm, setBlogForm, blogImageUploadType, setBlogImageUploadType, blogImageUploading, uploadToImgbb, saveBlog, resetBlogForm, isDark, editingItem, loadingBlogs }) => (
  <div className={`rounded-2xl p-8 transition-all duration-300 ${
    isDark 
      ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
      : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg'
  }`}>
    <div className="flex items-center justify-between mb-6">
      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{editingItem ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
      <button
        onClick={resetBlogForm}
        className={`transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
      >
        <X className="w-6 h-6" />
      </button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Title *</label>
          <input
            type="text"
            value={blogForm.title}
            onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="Enter blog title"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Author *</label>
          <input
            type="text"
            value={blogForm.author}
            onChange={e => setBlogForm({ ...blogForm, author: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="Author name"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Read Time *</label>
          <input
            type="text"
            value={blogForm.readTime}
            onChange={e => setBlogForm({ ...blogForm, readTime: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="e.g., 5 min read"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Tags (comma separated) *</label>
          <input
            type="text"
            value={blogForm.tags}
            onChange={e => setBlogForm({ ...blogForm, tags: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="React, JavaScript, Web Development"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Thumbnail *</label>
          <div className="flex items-center gap-4 mb-2">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                checked={blogImageUploadType === 'link'}
                onChange={() => setBlogImageUploadType('link')}
              />
              <span>Upload image through link</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                checked={blogImageUploadType === 'device'}
                onChange={() => setBlogImageUploadType('device')}
              />
              <span>Upload image from device</span>
            </label>
          </div>
          {blogImageUploadType === 'link' ? (
            <input
              type="url"
              value={blogForm.thumbnail}
              onChange={e => setBlogForm({ ...blogForm, thumbnail: e.target.value })}
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
                      setBlogForm({ ...blogForm, thumbnail: url });
                    } catch (err) {
                      alert('Image upload failed.');
                    }
                  }
                }}
              />
              {blogImageUploading && <span className="text-xs text-blue-500">Uploading...</span>}
              {blogForm.thumbnail && <img src={blogForm.thumbnail} alt="Preview" className="h-20 mt-2 rounded" />}
            </div>
          )}
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
          <input
            type="text"
            value={blogForm.category}
            onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="Enter category (optional)"
          />
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="featured"
            checked={blogForm.featured}
            onChange={e => setBlogForm({ ...blogForm, featured: e.target.checked })}
            className={`w-4 h-4 rounded focus:ring-[#218EF2] ${isDark ? 'text-[#218EF2] bg-gray-700 border-gray-600' : 'text-[#218EF2] bg-white border-gray-300'}`}
          />
          <label htmlFor="featured" className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Featured Post</label>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Excerpt *</label>
          <textarea
            value={blogForm.excerpt}
            onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
            rows={4}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none resize-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="Brief description of the blog post"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Content *</label>
          <div className={`mb-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>You can write HTML with inline CSS here.</div>
          <textarea
            value={blogForm.content}
            onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
            rows={12}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none resize-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="Full blog post content (supports HTML with inline CSS)"
          />
        </div>
      </div>
    </div>
    <div className="flex space-x-4 mt-8">
      <button
        onClick={saveBlog}
        className="bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 text-white"
        disabled={loadingBlogs}
      >
        <Save className="w-5 h-5" />
        <span>{editingItem ? 'Update' : 'Save'} Blog Post</span>
      </button>
      <button
        onClick={resetBlogForm}
        className={`px-6 py-3 rounded-xl font-semibold transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
        disabled={loadingBlogs}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default BlogForm; 