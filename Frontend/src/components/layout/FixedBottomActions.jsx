import React, { useContext } from 'react';
import { LayoutContext } from './AppLayout'; // Import context

const FixedBottomActions = ({ children }) => {
  // Grab the state from AppLayout
  const { isCollapsed } = useContext(LayoutContext);

  return (
    <footer 
      className={`fixed bottom-0 right-0 bg-white border-t border-[#E2E8F0] p-md z-40 transition-all duration-300 ease-in-out left-0 ${
        isCollapsed ? 'md:left-[80px]' : 'md:left-64'
      }`}
    >
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-sm">
        {children}
      </div>
    </footer>
  );
};

export default FixedBottomActions;