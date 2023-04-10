import React, { useEffect } from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
const Dashboard = () => {
  const { data } = useCurrentUser();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(data.user);
    }
  }, [data]);

  return <div>Dashboard</div>;
};

export default Dashboard;
