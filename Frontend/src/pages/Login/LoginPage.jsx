import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/layout/Logo';
import Footer from '../../components/layout/Footer';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const LoginPage = () => {
  const navigate = useNavigate()
  // State management for our form
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend authentication API here
    console.log("Logging in with:", formData);
    // After Sucessful login redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-fixed-dim/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-secondary-fixed-dim/10 blur-[100px] pointer-events-none z-0"></div>

      {/* Top Branding Section */}
      <header className="w-full flex justify-center py-xl z-10">
        <Logo />
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-md px-container-padding flex flex-col justify-center pb-xl z-10">
        
        {/* Welcome Typography */}
        <div className="mb-lg text-center">
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">Welcome back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Log in to manage your tasks and earnings.</p>
        </div>

        {/* Login Form Card */}
        <form 
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col gap-lg"
        >
          <Input 
            id="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />

          <Input 
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            rightLabel="Forgot?"
            rightLabelHref="#forgot"
            value={formData.password}
            onChange={handleInputChange}
          />

          <Button type="submit">
            Log In
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-md">
            <div className="h-[1px] bg-outline-variant flex-grow"></div>
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">or</span>
            <div className="h-[1px] bg-outline-variant flex-grow"></div>
          </div>

          {/* Secondary Signup Path */}
          <div className="text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Don't have an account?{' '}
              <a className="text-primary font-semibold hover:underline" href="#">Register now</a>
            </p>
          </div>
        </form>

        {/* Trust & Security Indicators */}
        <div className="mt-xl flex flex-col items-center gap-md">
          <div className="flex items-center gap-xs text-on-secondary-container bg-secondary-container px-md py-xs rounded-full">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <span className="font-label-sm text-label-sm">Institutional-grade security</span>
          </div>
          <p className="font-label-sm text-label-sm text-outline text-center px-lg">
            Your data is protected with 256-bit encryption and secure biometric protocols.
          </p>
        </div>

      </main>

      {/* Visual Anchor / Decorative Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;