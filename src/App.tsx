import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Certificates } from './pages/Certificates';
import { Hobbies } from './pages/Hobbies';
import { MissMinutes } from './components/MissMinutes';
import { Clock } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    { path: '/', label: '[ TIMELINE ]' },
    { path: '/projects', label: '[ PROJECTS ]' },
    { path: '/certificates', label: '[ CREDENTIALS ]' },
    { path: '/hobbies', label: '[ HOBBIES ]' },
  ];

  return (
    <>
      <nav className={location.pathname !== '/' ? 'nav-collapsed' : ''}>
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Clock size={32} color="var(--tva-orange)" />
          KRISTEN ARCHIVES
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile slide-out menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/hobbies" element={<Hobbies />} />
      </Routes>
      <MissMinutes />
    </Router>
  );
};

export default App;
