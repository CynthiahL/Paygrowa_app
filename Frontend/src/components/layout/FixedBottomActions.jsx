import React from 'react';

const FixedBottomActions = ({ children }) => {
  return (
    // md:left-64 ensures it respects the sidebar width on desktop
    <footer className="fixed bottom-0 left-0 md:left-64 right-0 bg-white border-t border-[#E2E8F0] p-md z-50">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-sm">
        {children}
      </div>
    </footer>
  );
};

export default FixedBottomActions;