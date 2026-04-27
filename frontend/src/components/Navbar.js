import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold text-white">
          <span className="text-brand-500">SM</span>Analyzer
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to ? 'text-brand-400' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/dashboard' ? 'text-brand-400' : 'text-white/60 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <span className="text-white/40 text-sm">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn-primary text-sm py-2 px-4">
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white/60" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-white/5 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="block text-white/70 hover:text-white py-1">
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block text-white/70 hover:text-white py-1">
                Dashboard
              </Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-400 py-1">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMenuOpen(false)} className="block btn-primary text-center mt-2">
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
