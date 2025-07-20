import React, { useState, useEffect } from 'react';
import { useTheme } from '../App';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Eye, 
  Calendar,
  Tag,
  Globe,
  Image as ImageIcon,
  FileText,
  Briefcase,
  Github
} from 'lucide-react';
import { BASE_API_URL } from '../main';
import AdminHeader from '../components/admin/AdminHeader';
import AdminTabNav from '../components/admin/AdminTabNav';
import BlogForm from '../components/admin/BlogForm';
import BlogList from '../components/admin/BlogList';
import ProjectForm from '../components/admin/ProjectForm';
import ProjectList from '../components/admin/ProjectList';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail: string;
  featured: boolean;
  category?: string;
  createdAt?: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  date: string;
  userId?: string;
}

const Admin: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'blogs' | 'projects'>('blogs');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogPost | Project | null>(null);

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    readTime: '',
    tags: '',
    thumbnail: '',
    featured: false,
    category: ''
  });

  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    thumbnail: '',
    liveUrl: '',
    githubUrl: '',
    technologies: '',
  });

  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [errorBlogs, setErrorBlogs] = useState<string | null>(null);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [blogImageUploadType, setBlogImageUploadType] = useState<'link' | 'device'>('link');
  const [blogImageUploading, setBlogImageUploading] = useState(false);
  const [projectImageUploadType, setProjectImageUploadType] = useState<'link' | 'device'>('link');
  const [projectImageUploading, setProjectImageUploading] = useState(false);

  // Helper to fetch blogs
  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    setErrorBlogs(null);
    try {
      const res = await fetch(`${BASE_API_URL}/api/post/getposts`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch blog posts');
      setBlogs(data.posts || []);
    } catch (err: any) {
      setErrorBlogs(err.message);
    } finally {
      setLoadingBlogs(false);
    }
  };

  // Helper to fetch projects
  const fetchProjects = async () => {
    setLoadingProjects(true);
    setErrorProjects(null);
    try {
      const res = await fetch(`${BASE_API_URL}/api/project/getprojects`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch projects');
      setProjects(data || []);
    } catch (err: any) {
      setErrorProjects(err.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  const uploadToImgbb = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error('Image upload failed');
    }
  };

  useEffect(() => { fetchBlogs(); }, []);
  useEffect(() => { fetchProjects(); }, []);

  const saveBlog = async () => {
    setLoadingBlogs(true);
    setErrorBlogs(null);
    setSuccessMessage(null);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem
        ? `${BASE_API_URL}/api/post/updatepost/${(editingItem as any)?._id}`
        : `${BASE_API_URL}/api/post/create`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: blogForm.title,
          excerpt: blogForm.excerpt,
          content: blogForm.content,
          author: blogForm.author,
          date: editingItem ? (editingItem as any)?.date : new Date().toISOString().split('T')[0],
          readTime: blogForm.readTime,
          tags: blogForm.tags.split(',').map(tag => tag.trim()),
          image: blogForm.thumbnail,
          category: blogForm.category || 'uncategorized',
          featured: blogForm.featured
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save blog post');
      setSuccessMessage(editingItem ? 'Blog post updated!' : 'Blog post created!');
      resetBlogForm();
      fetchBlogs();
    } catch (err: any) {
      setErrorBlogs(err.message);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const deleteBlog = async (_id: any, userId: any) => {
    setLoadingBlogs(true);
    setErrorBlogs(null);
    setSuccessMessage(null);
    try {
      const res = await fetch(`${BASE_API_URL}/api/post/deletepost/${_id}/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete blog post');
      setSuccessMessage('Blog post deleted!');
      fetchBlogs();
    } catch (err: any) {
      setErrorBlogs(err.message);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const editBlog = (blog: BlogPost) => {
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      readTime: blog.readTime,
      tags: (blog.tags || []).join(', '),
      thumbnail: blog.thumbnail,
      featured: blog.featured,
      category: blog.category || ''
    });
    setEditingItem(blog);
    setIsEditing(true);
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      readTime: '',
      tags: '',
      thumbnail: '',
      featured: false,
      category: ''
    });
    setEditingItem(null);
    setIsEditing(false);
  };

  const saveProject = async () => {
    setLoadingProjects(true);
    setErrorProjects(null);
    setSuccessMessage(null);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem
        ? `${BASE_API_URL}/api/project/updateproject/${(editingItem as any)?._id}/${(editingItem as any)?.userId}`
        : `${BASE_API_URL}/api/project/create`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: projectForm.title,
          description: projectForm.description,
          thumbnail: projectForm.thumbnail,
          liveUrl: projectForm.liveUrl,
          githubUrl: projectForm.githubUrl,
          technologies: projectForm.technologies.split(',').map(tech => tech.trim()),
          date: editingItem ? (editingItem as any)?.date : new Date().toISOString().split('T')[0],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save project');
      setSuccessMessage(editingItem ? 'Project updated!' : 'Project created!');
      resetProjectForm();
      fetchProjects();
    } catch (err: any) {
      setErrorProjects(err.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  const deleteProject = async (_id: any, userId: any) => {
    setLoadingProjects(true);
    setErrorProjects(null);
    setSuccessMessage(null);
    try {
      const res = await fetch(`${BASE_API_URL}/api/project/deleteproject/${_id}/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete project');
      setSuccessMessage('Project deleted!');
      fetchProjects();
    } catch (err: any) {
      setErrorProjects(err.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  const editProject = (project: Project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      thumbnail: project.thumbnail,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl || '',
      technologies: (project.technologies || []).join(', '),
    });
    setEditingItem(project);
    setIsEditing(true);
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      thumbnail: '',
      liveUrl: '',
      githubUrl: '',
      technologies: '',
    });
    setEditingItem(null);
    setIsEditing(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <AdminHeader isDark={isDark} />
      <AdminTabNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        blogsCount={blogs.length}
        projectsCount={projects.length}
        isDark={isDark}
      />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Add New Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 text-white"
          >
            <Plus className="w-5 h-5" />
            <span>Add New {activeTab === 'blogs' ? 'Blog Post' : 'Project'}</span>
          </button>
        </div>
        {/* Blog Posts Tab */}
        {activeTab === 'blogs' && (
          <div>
            {isEditing ? (
              <BlogForm
                blogForm={blogForm}
                setBlogForm={setBlogForm}
                blogImageUploadType={blogImageUploadType}
                setBlogImageUploadType={setBlogImageUploadType}
                blogImageUploading={blogImageUploading}
                uploadToImgbb={uploadToImgbb}
                saveBlog={saveBlog}
                resetBlogForm={resetBlogForm}
                isDark={isDark}
                editingItem={editingItem}
                loadingBlogs={loadingBlogs}
              />
            ) : (
              <BlogList
                blogs={blogs}
                isDark={isDark}
                editBlog={editBlog}
                deleteBlog={deleteBlog}
                loadingBlogs={loadingBlogs}
                errorBlogs={errorBlogs}
              />
            )}
          </div>
        )}
        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            {isEditing ? (
              <ProjectForm
                projectForm={projectForm}
                setProjectForm={setProjectForm}
                projectImageUploadType={projectImageUploadType}
                setProjectImageUploadType={setProjectImageUploadType}
                projectImageUploading={projectImageUploading}
                uploadToImgbb={uploadToImgbb}
                saveProject={saveProject}
                resetProjectForm={resetProjectForm}
                isDark={isDark}
                editingItem={editingItem}
                loadingProjects={loadingProjects}
              />
            ) : (
              <ProjectList
                projects={projects}
                isDark={isDark}
                editProject={editProject}
                deleteProject={deleteProject}
                loadingProjects={loadingProjects}
                errorProjects={errorProjects}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
