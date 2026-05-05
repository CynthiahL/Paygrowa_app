import React from 'react';
import Sidebar from './Sidebar';
import BottomNavBar from './BottomNavBar';

// Added hideMobileBottomNav prop
const AppLayout = ({ children, mobileHeader, hideMobileBottomNav = false }) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen md:ml-64 overflow-hidden relative">
        <div className="md:hidden">
          {mobileHeader}
        </div>

        <main className="flex-1 overflow-y-auto pt-16 md:pt-8 pb-24 md:pb-8 px-4 md:px-8">
          <div className="max-w-3xl mx-auto w-full">
            {children}
          </div>
        </main>

        {/* Conditionally hide the bottom nav if the page requests it */}
        {!hideMobileBottomNav && (
          <div className="md:hidden">
            <BottomNavBar />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppLayout;