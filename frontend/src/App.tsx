import React, { createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const itemStr = localStorage.getItem('adminSession');
  if (!itemStr) {
    return <Navigate to="/login" replace />;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem('adminSession');
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppLayout() {
  const location = useLocation();
  const { isDark } = useTheme();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
        </Routes>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;