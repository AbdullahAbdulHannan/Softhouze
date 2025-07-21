import React from 'react';
import { useTheme } from '../App';
import { Shield, Mail, Phone, Calendar } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-blue-900/30 via-gray-900 to-black'
              : 'bg-gradient-to-br from-blue-50 via-white to-gray-50'
          }`}></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#218EF2]/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-[#218EF2] mr-4" />
            <h1 className="text-5xl lg:text-6xl font-bold">
              Privacy 
              <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Policy</span>
            </h1>
          </div>
          <p className={`text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
          </p>
          <div className={`mt-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className="flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              Last updated: January 15, 2024
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          {/* Introduction */}
          <div className={`rounded-2xl p-8 mb-12 transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our Commitment to Your Privacy
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
            </p>
          </div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[1,2,3,4].map((i) => (
              <div key={i} className={`rounded-2xl p-8 transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-[#218EF2]/50'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
              }`}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#218EF2] to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Lorem Ipsum {i}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[1,2,3,4].map(j => (
                    <li key={j} className={`flex items-start ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className="w-2 h-2 bg-[#218EF2] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Sections */}
          <div className="space-y-8">
            {/* Cookies */}
            <div className={`rounded-2xl p-8 transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg'
            }`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Cookies and Tracking Technologies
              </h3>
              <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Essential Cookies</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Analytics Cookies</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className={`rounded-2xl p-8 transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg'
            }`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Your Rights and Choices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1,2,3,4].map(j => (
                  <div key={j}>
                    <h4 className={`font-semibold mb-2 text-[#218EF2]`}>Lorem Option {j}</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className={`rounded-2xl p-8 transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-[#218EF2]/30'
                : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-[#218EF2]/30'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Contact Us About Privacy
              </h3>
              <p className={`mb-6 leading-relaxed ${isDark ? 'text-blue-100' : 'text-blue-800'}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-[#218EF2] mr-3" />
                  <div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Email</div>
                    <div className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>privacy@softhouze.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-[#218EF2] mr-3" />
                  <div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Phone</div>
                    <div className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;