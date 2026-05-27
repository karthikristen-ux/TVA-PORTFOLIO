import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Certificates } from './pages/Certificates';
import { Hobbies } from './pages/Hobbies';
import { MissMinutes } from './components/MissMinutes';
import { Clock } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav>
      <div className="logo">
        <Clock size={32} color="var(--tva-orange)" />
        KRISTEN ARCHIVES
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>[ TIMELINE ]</Link>
        <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>[ PROJECTS ]</Link>
        <Link to="/certificates" className={location.pathname === '/certificates' ? 'active' : ''}>[ CREDENTIALS ]</Link>
        <Link to="/hobbies" className={location.pathname === '/hobbies' ? 'active' : ''}>[ HOBBIES ]</Link>
      </div>
    </nav>
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
