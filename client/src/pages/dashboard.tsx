import React, { useEffect } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import ProtectedLayout from '@/components/common/ProtectedLayout';
const Dashboard = () => {
  return (
    <ProtectedLayout>
      {' '}
      <div>Dashboard</div>
    </ProtectedLayout>
  );
};

export default Dashboard;
