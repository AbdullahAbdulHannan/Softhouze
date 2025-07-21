import React from 'react';
import { Edit, Trash2, Globe, Github } from 'lucide-react';

type Props = {
  projects: any[];
  isDark: boolean;
  editProject: (project: any) => void;
  deleteProject: (id: any, userId: any) => void;
  loadingProjects: boolean;
  errorProjects: string | null;
};

const ProjectList: React.FC<Props> = ({ projects, isDark, editProject, deleteProject, loadingProjects, errorProjects }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {loadingProjects ? (
      <p>Loading projects...</p>
    ) : errorProjects ? (
      <p className="text-red-500">{errorProjects}</p>
    ) : projects.length === 0 ? (
      <p>No projects found. Add a new one!</p>
    ) : (
      projects.map((project) => (
        <div key={project._id} className={`flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 hover:border-[#218EF2]/50'
            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
        }`}>
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="flex flex-col flex-1 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-[#218EF2]/20 text-[#218EF2] px-2 py-1 rounded-full text-xs font-medium">Project</span>
              <div className="flex space-x-2">
                <button onClick={() => editProject(project)} className="text-blue-400 hover:text-blue-300 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => deleteProject(project._id, project.userId)} className="text-[#218EF2] hover:text-blue-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
            <p className={`text-sm mb-3 line-clamp-2 break-words ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {(project.technologies || []).slice(0, 3).map((tech: string) => (
                <span key={tech} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>{tech}</span>
              ))}
            </div>
            <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              <span>{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'No date'}</span>
              <div className="flex space-x-2">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#218EF2] hover:text-blue-500">
                  <Globe className="w-4 h-4" />
                </a>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            <div className="flex-grow" />
          </div>
        </div>
      ))
    )}
  </div>
);

export default ProjectList; 