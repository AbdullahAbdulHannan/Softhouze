import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

type Props = {
  blogs: any[];
  isDark: boolean;
  editBlog: (blog: any) => void;
  deleteBlog: (id: any, userId: any) => void;
  loadingBlogs: boolean;
  errorBlogs: string | null;
};

const BlogList: React.FC<Props> = ({ blogs, isDark, editBlog, deleteBlog, loadingBlogs, errorBlogs }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {loadingBlogs ? (
      <p>Loading blog posts...</p>
    ) : errorBlogs ? (
      <p className="text-red-500">{errorBlogs}</p>
    ) : blogs.length === 0 ? (
      <p>No blog posts found. Add a new one!</p>
    ) : (
      blogs.map((blog) => (
        <div key={blog._id} className={`rounded-2xl overflow-hidden transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 hover:border-[#218EF2]/50'
            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
        }`}>
          <div className="relative overflow-hidden">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            {blog.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-[#218EF2] text-white px-3 py-1 rounded-full text-xs font-medium">Featured</span>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-800 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{blog.category}</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{blog.title}</h3>
            <p className={`text-sm mb-3 break-words ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{
              blog.excerpt && blog.excerpt.length > 120
                ? blog.excerpt.slice(0, 120) + '...'
                : blog.excerpt
            }</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {(blog.tags || []).map((tag: string) => (
                <span key={tag} className={`px-2 py-1 rounded-md text-xs font-medium ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}> 
              <span>{blog.author}</span>
              <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'No date'}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <button onClick={() => editBlog(blog)} className="text-blue-400 hover:text-blue-300 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => deleteBlog(blog._id, blog.userId)} className="text-[#218EF2] hover:text-blue-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);

export default BlogList; 