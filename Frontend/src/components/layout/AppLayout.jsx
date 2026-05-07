import React, { useState, createContext } from 'react';
import Sidebar from './Sidebar';
import BottomNavBar from './BottomNavBar';

// 1. Create a Context to share the collapse state globally
export const LayoutContext = createContext();

const AppLayout = ({ children, mobileHeader, hideMobileBottomNav = false }) => {
  // 2. State to track if the sidebar is collapsed
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <LayoutContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {/* 👇 CHANGED: h-screen to min-h-screen */}
      <div className="flex min-h-screen w-full bg-background">
        
        <Sidebar />

        {/* 👇 CHANGED: h-screen to min-h-screen */}
        <div className={`flex-1 flex flex-col min-h-screen overflow-hidden relative transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:ml-[80px]' : 'md:ml-64'
        }`}>
          
          <div className="md:hidden">
            {mobileHeader}
          </div>

          <main className="flex-1 overflow-y-auto pt-16 md:pt-8 pb-24 md:pb-8 px-4 md:px-8">
            <div className="max-w-3xl mx-auto w-full">
              {children}
            </div>
          </main>

          {!hideMobileBottomNav && (
            <div className="md:hidden">
              <BottomNavBar />
            </div>
          )}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default AppLayout;