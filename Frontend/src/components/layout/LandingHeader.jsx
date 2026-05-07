import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-outline-variant">
      <div className="flex justify-between items-center w-full px-4 h-14 max-w-7xl mx-auto">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
          <span className="text-lg font-bold tracking-tight text-primary font-h3">PayGrowa</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-outline hover:text-primary transition-colors font-label-md px-2 py-1" href="#about">About Us</a>
          <a className="text-outline hover:text-primary transition-colors font-label-md px-2 py-1" href="#contact">Contact Us</a>
          <button 
            onClick={() => navigate('/login')}
            className="bg-primary text-on-primary px-6 py-2 rounded font-label-md hover:opacity-90 transition-all active:scale-95"
          >
            Login
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2 text-primary active:opacity-80 transition-all">
          <span className="material-symbols-outlined">menu</span>
        </button>

      </div>
    </header>
  );
};

export default LandingHeader;