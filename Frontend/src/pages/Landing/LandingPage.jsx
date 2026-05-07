import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../../components/layout/LandingHeader';
import LandingFooter from '../../components/layout/LandingFooter';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col">
      <LandingHeader />

      <main className="flex-grow pt-14">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-surface-container-low py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
            <div className="z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm mb-4">
                Now Live in Emerging Markets
              </span>
              <h1 className="font-h1 text-primary mb-6 leading-tight">
                Earn money by completing simple tasks
              </h1>
              <p className="font-body-lg text-on-surface-variant mb-8 max-w-lg">
                Turn your spare time into extra income. Join thousands of users who complete micro-tasks and get paid directly to their local accounts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/register')}
                  className="h-12 px-8 bg-primary text-on-primary rounded font-label-md hover:opacity-95 active:scale-95 transition-all flex items-center justify-center"
                >
                  Get Started
                </button>
                <button className="h-12 px-8 border border-outline text-primary rounded font-label-md hover:bg-surface-container-high transition-all flex items-center justify-center">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
              <div className="relative bg-white p-2 rounded-xl border border-outline-variant transform rotate-2 shadow-sm">
                <img 
                  alt="Person using a smartphone" 
                  className="rounded-lg w-full h-[400px] object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6aTBMvMOkPQ2nK0frNUjvWmow2y8bAtwD_3qUGuW1uOBxxxTJIkr0gat3ijJGYjS1AV_hUAOuuHc7hB9wd1N7u5DNAii9C5kOREIe0XP2wgeZcZyC2A7ezHSJYQlhSDhkf2moC-jPlI4pthnDt36zsvNdwhCcw5KDvx9UithftKXS11asI5g3ZAS0NYHLk2oVgajJUJstPUqjENOQxjpDqATgZIOMiw30VId7j6SqSNqFVj8ze6VcEZ5JwGZOXD9M5NGrxrQHZrw" 
                />
                <div className="absolute bottom-6 -left-6 bg-white p-4 rounded-lg border border-outline-variant shadow-lg flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-outline">Last Task Paid</p>
                    <p className="font-h3 text-secondary">₦2,500.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-white border-y border-outline-variant">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-around gap-8 text-center">
            <div>
              <p className="font-h2 text-primary">₦12.5M+</p>
              <p className="font-label-md text-on-surface-variant uppercase tracking-wider">Paid out to users</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-outline-variant"></div>
            <div>
              <p className="font-h2 text-primary">45,000+</p>
              <p className="font-label-md text-on-surface-variant uppercase tracking-wider">Active taskers</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-outline-variant"></div>
            <div>
              <p className="font-h2 text-primary">98.2%</p>
              <p className="font-label-md text-on-surface-variant uppercase tracking-wider">Success rate</p>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-h1 text-primary mb-4">Start earning in minutes</h2>
              <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">No complex skills required. Just a smartphone, an internet connection, and your time.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white p-8 border border-outline-variant rounded-xl hover:border-primary transition-all duration-300">
                <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">touch_app</span>
                </div>
                <h3 className="font-h3 text-primary mb-3">Choose a task</h3>
                <p className="font-body-sm text-on-surface-variant">Browse hundreds of available micro-tasks ranging from surveys to content moderation.</p>
              </div>
              <div className="group bg-white p-8 border border-outline-variant rounded-xl hover:border-primary transition-all duration-300">
                <div className="w-12 h-12 bg-secondary-fixed rounded-lg flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">task_alt</span>
                </div>
                <h3 className="font-h3 text-primary mb-3">Complete it</h3>
                <p className="font-body-sm text-on-surface-variant">Follow simple instructions to finish the task. Most tasks take less than 5 minutes to complete.</p>
              </div>
              <div className="group bg-white p-8 border border-outline-variant rounded-xl hover:border-primary transition-all duration-300">
                <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <h3 className="font-h3 text-primary mb-3">Get paid</h3>
                <p className="font-body-sm text-on-surface-variant">Once verified, funds are instantly credited to your PayGrowa wallet for withdrawal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 bg-primary overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-h1 text-white mb-6">Real earnings, real impact</h2>
              <p className="font-body-lg text-primary-fixed-dim mb-10">
                Join our community of earners who are building a better future, one task at a time. Secure, verified, and always on time.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white">
                  <span className="material-symbols-outlined text-secondary-fixed">verified</span>
                  <span className="font-body-md">Enterprise-grade security for all transactions</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <span className="material-symbols-outlined text-secondary-fixed">verified</span>
                  <span className="font-body-md">Direct bank transfers to local banks</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <span className="material-symbols-outlined text-secondary-fixed">verified</span>
                  <span className="font-body-md">Transparent task verification process</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                  <p className="font-label-sm text-primary-fixed-dim">John D. just earned</p>
                  <p className="font-h3 text-white">₦1,200.00</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                  <p className="font-label-sm text-primary-fixed-dim">Sarah K. just earned</p>
                  <p className="font-h3 text-white">₦4,500.00</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                  <p className="font-label-sm text-primary-fixed-dim">Musa A. just earned</p>
                  <p className="font-h3 text-white">₦800.00</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                  <p className="font-label-sm text-primary-fixed-dim">Grace O. just earned</p>
                  <p className="font-h3 text-white">₦2,100.00</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-h1 text-primary mb-6">Ready to start earning?</h2>
            <p className="font-body-lg text-on-surface-variant mb-10">
              Create your free account today and browse thousands of available tasks. Your first payout could be minutes away.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => navigate('/register')}
                className="h-14 px-12 bg-primary text-on-primary rounded font-h3 hover:opacity-90 active:scale-95 transition-all shadow-lg"
              >
                Create Free Account
              </button>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;