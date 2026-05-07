import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import DashboardHeader from '../../components/layout/DashboardHeader';
import TaskCard from '../../components/ui/TaskCard';
import { mockTasks } from '../../data/mockTasks';

const DashboardPage = () => {
  const savedName = localStorage.getItem('userFirstName') || 'User';
  const [userData] = useState({ firstName: savedName, balance: "₦0.00" });
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = mockTasks.filter(task => {
    if (activeFilter === 'All') return true;
    return task.status === activeFilter;
  });

  return (
    <AppLayout mobileHeader={<DashboardHeader balance={userData.balance} />}>
      <div className="space-y-8">
        
        {/* ✅ FIXED: Restored text-h1 and text-body-md classes */}
        <section className="space-y-2">
          <h1 className="font-h1 text-h1 text-primary">Welcome {userData.firstName}</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Start earning immediately by completing micro-tasks.</p>
        </section>

        {/* ✅ RESTORED: Momentum / Trophy Banner */}
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-md flex items-center gap-md">
          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-on-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface">
            You have completed <span className="font-bold text-primary">5 tasks</span>, congratulations, keep the momentum going.
          </p>
        </div>

        {/* ✅ RESTORED: Identity Verification Card */}
        <div className="bg-white border border-outline-variant rounded-xl p-md flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-outline text-[24px]">shield_person</span>
            <div>
              <h3 className="font-h3 text-[16px] font-semibold text-on-surface">Identity Verification</h3>
              <p className="font-label-sm text-label-sm text-outline mt-0.5">Secure your account to withdraw</p>
            </div>
          </div>
          <button className="text-primary font-label-md bg-primary-fixed/30 hover:bg-primary-fixed transition-colors px-4 py-2 rounded-lg">
            Verify
          </button>
        </div>

        {/* Available Tasks Header & Filter Toggle */}
        <div className="flex flex-col gap-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-h3 text-h3 text-primary">Available Tasks</h3>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-full transition-colors flex items-center justify-center ${showFilters ? 'bg-primary-fixed text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
            >
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>

          {/* Filter Chips */}
          {showFilters && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['All', 'Available', 'Pending', 'Done'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                    activeFilter === filter 
                      ? 'bg-primary text-white' 
                      : 'bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="text-center py-12 bg-surface-container-low rounded-xl border border-outline-variant border-dashed">
              <span className="material-symbols-outlined text-outline text-4xl mb-2">search_off</span>
              <p className="font-body-md text-on-surface-variant">No tasks found for this filter.</p>
            </div>
          )}
        </div>
        
      </div>
    </AppLayout>
  );
};

export default DashboardPage;