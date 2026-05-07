import React from 'react';

const LandingFooter = () => {
  return (
    <footer className="bg-surface-container-highest py-16 border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              <span className="text-lg font-bold tracking-tight text-primary">PayGrowa</span>
            </div>
            <p className="font-body-sm text-on-surface-variant max-w-xs">
              The leading platform for micro-tasking in emerging markets. We bridge the gap between global digital labor and local talent.
            </p>
          </div>
          <div>
            <h4 className="font-label-md text-primary uppercase mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a className="font-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="font-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Us</a></li>
              <li><a className="font-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-primary uppercase mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a className="font-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="font-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="font-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label-sm text-outline">© 2024 PayGrowa Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-outline hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">language</span></a>
            <a className="text-outline hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;