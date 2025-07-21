import React from 'react';
import { useTheme } from '../App';
import { X, ExternalLink, Github, Calendar, Tag, Globe, Code, Star } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  date: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  const { isDark } = useTheme();

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={`relative rounded-3xl w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden transition-all duration-500 transform animate-scale-in shadow-2xl ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-[#218EF2]/20' 
            : 'bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className={`relative p-6 border-b ${
          isDark ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <button 
            onClick={onClose}
            className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              isDark 
                ? 'text-gray-400 bg-gray-800/50 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 bg-gray-100/50 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="pr-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent`}>
              {project.title}
            </h2>
            <div className={`flex items-center space-x-4 text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-[#218EF2]" />
                <span>Released {new Date(project.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-[#218EF2]" />
                <span>Featured Project</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Image Section */}
          <div className="w-full lg:w-3/5 relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#218EF2]/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 hover:bg-[#218EF2]"
                >
                  <Globe className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 hover:bg-gray-800"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="w-full lg:w-2/5 p-8 overflow-y-auto">
            {/* Description */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <Code className="w-5 h-5 mr-2 text-[#218EF2]" />
                Project Overview
              </h3>
              <p className={`text-base leading-relaxed break-words ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <Tag className="w-5 h-5 mr-2 text-[#218EF2]" />
                Technologies Used
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {project.technologies.map((tech) => (
                  <div key={tech} className={`group relative overflow-hidden rounded-xl p-3 transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-gradient-to-r from-gray-800 to-gray-700 hover:from-[#218EF2]/20 hover:to-blue-600/20 border border-gray-600' 
                      : 'bg-gradient-to-r from-gray-100 to-gray-50 hover:from-[#218EF2]/10 hover:to-blue-600/10 border border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#218EF2] rounded-full"></div>
                      <span className={`text-sm font-medium ${
                        isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {tech}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>View Live Project</span>
              </a>
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group px-6 py-4 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105 ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                  }`}
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>View Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;