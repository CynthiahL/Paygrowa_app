import React from 'react';

const FixedBottomActions = ({ children }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] p-md z-50">
      {/* max-w-2xl matches our main content width for perfect alignment on desktop */}
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-sm">
        {children}
      </div>
    </footer>
  );
};

export default FixedBottomActions;