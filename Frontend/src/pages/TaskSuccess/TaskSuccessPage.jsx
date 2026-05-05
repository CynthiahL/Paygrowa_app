import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import DetailTopBar from '../../components/layout/DetailTopBar';
import Toast from '../../components/ui/Toast';
import TimelineItem from '../../components/ui/TimelineItem';
import StatCard from '../../components/ui/StatCard';

const TaskSuccessPage = () => {
  const navigate = useNavigate();

  // Mock data for the success state
  const successData = {
    amountEarned: '₦1,000',
    newBalance: '₦12,450',
    trustScoreIncrease: '+15'
  };

  return (
    <AppLayout 
      // Note: We are keeping the bottom nav visible here as per the screen_9.png design
      mobileHeader={
        <DetailTopBar 
          onBack={() => navigate('/dashboard')} 
          onMenuClick={() => console.log('Menu clicked')} 
        />
      }
    >
      <div className="max-w-xl mx-auto w-full flex flex-col pt-8 pb-12">
        
        <Toast 
          title="Task Verified" 
          message="1,000 points added to history." 
          icon="stars" 
        />

        {/* Success Illustration & Header */}
        <div className="w-full text-center mb-xl">
          <div className="relative w-48 h-48 mx-auto mb-lg">
            <div className="absolute inset-0 bg-secondary-container opacity-20 rounded-full scale-110"></div>
            <div className="absolute inset-0 bg-secondary rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
          </div>
          <h1 className="font-h1 text-h1 text-primary mb-sm">
            You earned {successData.amountEarned} 🎉
          </h1>
          <p className="font-body-md text-body-md text-outline px-md">
            Your payment is being processed — you will receive it within 1 hour.
          </p>
        </div>

        {/* Status Tracker (Timeline) */}
        <div className="w-full bg-white border border-[#E2E8F0] rounded-xl p-lg mb-xl shadow-sm">
          <h3 className="font-h3 text-h3 text-primary mb-md">Payment Status</h3>
          <div className="pt-2">
            <TimelineItem 
              status="done"
              title="Earned"
              description="Survey successfully submitted"
              icon="check"
            />
            <TimelineItem 
              status="in-progress"
              title="Verifying"
              description="Checking response quality"
              icon="sync"
            />
            <TimelineItem 
              status="pending"
              title="Paid"
              description="Funds sent to your wallet"
              icon="schedule"
              isLast={true}
            />
          </div>
        </div>

        {/* Asymmetric Info Grid (Bento Style) */}
        <div className="grid grid-cols-2 gap-md w-full mb-xl">
          <StatCard 
            title="New Balance"
            value={successData.newBalance}
            icon="account_balance_wallet"
          />
          <StatCard 
            variant="success"
            title="Trust Score"
            value={successData.trustScoreIncrease}
            icon="verified_user"
            trendIcon="trending_up"
          />
        </div>

        {/* Primary Action */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full bg-primary text-on-primary font-h3 py-4 rounded-xl flex items-center justify-center gap-sm active:scale-[0.98] transition-transform duration-100 shadow-lg hover:opacity-90"
        >
          <span>Go to Dashboard</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>

      </div>
    </AppLayout>
  );
};

export default TaskSuccessPage;