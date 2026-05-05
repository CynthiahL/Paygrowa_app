import React, { useEffect, useState } from 'react';

const Toast = ({ title, message, icon = "stars", duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss after 'duration' milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    // Positioning accounts for the 64-width Sidebar on md+ screens
    <div className="fixed top-20 right-4 left-4 md:left-[17rem] md:right-auto md:w-96 bg-secondary text-white p-md rounded-lg shadow-xl flex items-center gap-md z-[60] animate-fade-in-down">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        {icon}
      </span>
      <div className="flex-grow">
        <p className="font-label-md text-label-md">{title}</p>
        <p className="text-[12px] opacity-90">{message}</p>
      </div>
      <button onClick={handleClose} className="hover:bg-white/20 rounded-full p-1 transition-colors">
        <span className="material-symbols-outlined text-[18px] opacity-70">close</span>
      </button>
    </div>
  );
};

export default Toast;