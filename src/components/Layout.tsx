import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText,
  Newspaper,
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Plus,
} from 'lucide-react';
import ChatbotButton from './ChatbotButton';
import CreateCaseFab from './CreateCaseFab';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleCreateNewCaseClick = () => {
    navigate('/new-case');
  };

  return (
    <>
    <div className="flex h-screen overflow-hidden"> 
      {/* Full-width top navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 sm:px-6 bg-brand-dark border-b border-brand-dark shadow-sm">
        <button 
          className="p-2 text-white rounded-lg lg:hidden hover:text-gray-200 hover:bg-blue-700 transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        
        {/* Logo and Title */}
        <div className="flex items-center">
        {/*   <img 
            src=""
            alt="Logo" 
            className="w-30 h-12 mr-2"
          /> */}
          
          <span className="text-3xl font-bold text-white">Logo</span>
        </div>
        
        <div className="flex items-center ml-auto space-x-6">
          {/* Profile dropdown */}
          <div className="relative">
            <button 
              className="flex items-center px-3 py-2 text-sm text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <img 
                src={user?.avatar || 'https://i.pravatar.cc/300'} 
                alt="User avatar" 
                className="w-8 h-8 rounded-full ring-2 ring-gray-200"
              />
              <span className="ml-2 text-sm font-medium text-white hidden sm:block">{user?.name}</span>
              <ChevronDown className="ml-1 w-4 h-4 text-white hidden sm:block" />
            </button>
            
            {isProfileOpen && (
              <div 
                className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                onBlur={() => setIsProfileOpen(false)}
              >
                <div className="py-1">
                  <div className="px-4 py-2 text-xs text-gray-400">
                    Signed in as
                  </div>
                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
                    {user?.name}
                  </div>
                  <button 
                    onClick={() => navigate('/settings')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-48 h-screen transform bg-brand-dark transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6"> 
          <div className="flex items-center justify-end lg:hidden">
            <button 
            className="p-1 text-white rounded-md hover:bg-blue-800" 
            onClick={() => setIsSidebarOpen(false)}
            >
            <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Spacer for large screens */}
        <div className="h-16 hidden lg:block"></div>
        
        <div className="px-4 py-6">
          <nav className="space-y-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-700 text-white shadow-sm' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white hover:shadow-sm'
                }`
              }
            >
             
              Dashboard
            </NavLink>
                   <NavLink 
              to="/new-case" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-700 text-white shadow-sm' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white hover:shadow-sm'
                }`
              }
            >
         
              Create new case
            </NavLink>

            <NavLink 
              to="/news" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-700 text-white shadow-sm' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white hover:shadow-sm'
                }`
              }
            >
         
              News
            </NavLink>
          </nav>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 bg-brand-dark mt-16">

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 min-w-0 rounded-tl-md lg:ml-48">
          <main>
            <div className="max-w-7xl mx-auto">
             {children}
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 lg:ml-48">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-600 text-center">
                © {new Date().getFullYear()} Lumera. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact Support</a> 
              </div>
            </div>
          </div>
        </footer>

        {/* Chatbot Button */}
        <ChatbotButton isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />

        {/* Create Case FAB */}
        <CreateCaseFab isChatbotOpen={isChatbotOpen} />
      </div>
    </div>
    </>
  );
};

export default Layout;
