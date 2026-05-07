import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../components/layout/Logo';
import Footer from '../../components/layout/Footer';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Basic validation mockup
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem('userFirstName', formData.firstName);

    console.log("Registering with:", formData);
    alert("Account created successfully! Please log in.");
    
    // Send user to the login screen after successful registration
    navigate('/login'); 
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center relative overflow-x-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-fixed-dim/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-secondary-fixed-dim/10 blur-[100px] pointer-events-none z-0"></div>

      <header className="w-full flex justify-center py-xl z-10 cursor-pointer" onClick={() => navigate('/')}>
        <Logo />
      </header>

      <main className="flex-grow w-full max-w-md px-container-padding flex flex-col justify-center pb-xl z-10">
        
        <div className="mb-lg text-center">
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">Create an Account</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Join thousands of taskers earning daily.</p>
        </div>

        <form 
          onSubmit={handleRegister}
          className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col gap-lg shadow-sm"
        >
          <div className="grid grid-cols-2 gap-4">
            <Input id="firstName" label="First Name" placeholder="John" value={formData.firstName} onChange={handleInputChange} />
            <Input id="lastName" label="Last Name" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} />
          </div>

          <Input 
            id="email" label="Email" type="email" placeholder="name@example.com" 
            value={formData.email} onChange={handleInputChange} 
          />

          <Input 
            id="password" label="Password" type="password" placeholder="••••••••" 
            value={formData.password} onChange={handleInputChange} 
          />
          
          <Input 
            id="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" 
            value={formData.confirmPassword} onChange={handleInputChange} 
          />

          <Button type="submit">
            Create Account
          </Button>

          <div className="flex items-center gap-md">
            <div className="h-[1px] bg-outline-variant flex-grow"></div>
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">or</span>
            <div className="h-[1px] bg-outline-variant flex-grow"></div>
          </div>

          <div className="text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">Log In</Link>
            </p>
          </div>
        </form>

        <div className="mt-xl flex flex-col items-center gap-md">
          <div className="flex items-center gap-xs text-on-secondary-container bg-secondary-container px-md py-xs rounded-full">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <span className="font-label-sm text-label-sm">Institutional-grade security</span>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;