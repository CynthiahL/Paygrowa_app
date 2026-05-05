import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import DashboardHeader from '../../components/layout/DashboardHeader';
import TaskCard from '../../components/ui/TaskCard';

const DashboardPage = () => {
  const [userData] = useState({ firstName: "Favour", balance: "₦0.00" });
  // ... tasks state array ...
  const [tasks] = useState([
    {
      id: 1,
      category: 'Survey',
      title: 'Consumer Behavior Survey',
      status: 'Available',
      price: '₦1,500',
      duration: '10 mins'
    },
    {
      id: 2,
      category: 'App Test',
      title: 'E-commerce Navigation Test',
      status: 'Pending',
      price: '₦2,200',
      duration: '15 mins'
    },
    {
      id: 3,
      category: 'Data Entry',
      title: 'Receipt Transcription',
      status: 'Done',
      price: '₦800',
      duration: '5 mins'
    }
  ]);

  return (
    // 1. Wrap the page in AppLayout
    // 2. Pass the specific mobile header for this page
    <AppLayout mobileHeader={<DashboardHeader balance={userData.balance} />}>
      
      {/* ALL we put in here is the actual content! No more nav bars or padding logic */}
      <div className="space-y-6">
        <section className="space-y-1">
          <h2 className="font-h1 text-h1 text-primary">Welcome {userData.firstName}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Start earning immediately by completing micro-tasks.</p>
        </section>

        {/* ... Momentum Banner ... */}
        <div className="bg-primary-container p-4 rounded-xl flex items-center gap-4">
          <div className="bg-secondary-container p-2 rounded-full flex-shrink-0">
            <span className="material-symbols-outlined text-primary">rocket_launch</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-primary-fixed-variant leading-tight">
            You have completed {userData.completedTasksCount} tasks, congratulations, keep the momentum going.
          </p>
        </div>

        {/* ... Earnings Bento Card ... */}

        <section className="bg-primary rounded-xl p-6 text-white overflow-hidden relative border border-primary-container">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-on-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider">Total Earnings</p>
                <h3 className="text-3xl font-bold font-inter mt-1">{userData.totalEarnings}</h3>
              </div>
              <span className="material-symbols-outlined text-on-tertiary-container text-2xl">account_balance_wallet</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-container/50 w-fit px-3 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-on-tertiary-container text-sm">trending_up</span>
              <p className="font-label-sm text-label-sm">{userData.weeklyEarnings} this week</p>
            </div>
          </div>
        </section>

        {/* ... Verification Section ... */}

        {!userData.isVerified && (
          <section className="bg-white border border-outline-variant rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              <div>
                <h4 className="font-label-md text-label-md text-primary">Identity Verification</h4>
                <p className="text-[11px] text-on-surface-variant">Secure your account to withdraw</p>
              </div>
            </div>
            <button className="bg-secondary text-white font-label-md text-label-md px-4 py-2 rounded-lg active:scale-95 transition-transform hover:opacity-90">
              Verify
            </button>
          </section>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <h3 className="font-h3 text-h3 text-primary">Available Tasks</h3>
          <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">tune</span></button>
        </div>

       
          {/* Render your TaskCards here */}
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard 
                key={task.id}
                category={task.category}
                title={task.title}
                status={task.status}
                price={task.price}
                duration={task.duration}
              />
            ))}
          </div>

          <button className="w-full py-4 border-2 border-dashed border-outline-variant rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors active:scale-[0.99]">
          Load More Tasks
        </button>
      </div>
      
    </AppLayout>
  );
};

export default DashboardPage;