import React from 'react';

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-12 bg-primary text-on-primary font-h3 text-h3 rounded flex items-center justify-center active:opacity-80 transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;