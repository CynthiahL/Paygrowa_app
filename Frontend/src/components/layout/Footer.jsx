import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-container-padding py-lg flex flex-col md:flex-row justify-between items-center gap-md border-t border-outline-variant mt-auto z-10">
      <div className="flex items-center gap-md">
        <span className="font-label-sm text-label-sm text-outline">© 2024 PayGrowa Financial</span>
        <span className="h-3 w-[1px] bg-outline-variant hidden md:block"></span>
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
      </div>
      
      <div className="flex gap-md grayscale opacity-50">
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[18px]">lock</span>
          <span className="font-label-sm text-label-sm">SSL Secure</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;