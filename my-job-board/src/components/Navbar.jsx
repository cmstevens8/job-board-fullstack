import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/Verdant1.png';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const showRoleLinks = user && !["/login", "/register"].includes(location.pathname);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex justify-between items-center z-50">
      <div className="flex items-center">
        <img 
          src={Logo} 
          alt="Verdant Logo" 
          style={{ height: '40px', width: '40px', objectFit: 'contain', marginRight: '12px', verticalAlign: 'middle' }} 
        />
        <span className="font-serif text-3xl font-bold text-green-700 dark:text-green-300" style={{ lineHeight: '40px' }}>
          Verdant
        </span>
        <span className="font-sans text-sm text-gray-600 dark:text-gray-400 ml-2" style={{ lineHeight: '40px' }}>
          – Where Talent Grows
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {showRoleLinks && user.role === "job-seeker" && (
          <>
            <Link to="/jobs" className="text-green-700 hover:text-green-900 font-mono mr-4">Find Jobs</Link>
            <Link to="/applications" className="text-green-700 hover:text-green-900 font-mono mr-4">My Applications</Link>
            <Link to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="text-green-700 hover:text-green-900 font-mono mr-4">
              Logout
            </Link>
          </>
        )}

        {showRoleLinks && user.role === "employer" && (
          <>
            <Link to="/jobs" className="text-green-700 hover:text-green-900 font-mono mr-4">Jobs Posted</Link>
            <Link to="/admin" className="text-green-700 hover:text-green-900 font-mono mr-4">Manage Jobs</Link>
            <Link to="/applications" className="text-green-700 hover:text-green-900 font-mono mr-4">Applications Received</Link>
            <Link to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="text-green-700 hover:text-green-900 font-mono mr-4">
              Logout
            </Link>
          </>
        )}

        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition" aria-label="Toggle Theme">
          {theme === 'light' ? <IoMoonOutline size={20} /> : <IoSunnyOutline size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
