import React from 'react';
import ProtectedLayout from '@/components/common/ProtectedLayout';
import UsersTable from '@/components/features/user/UsersTable';

const Users = () => {
  return (
    <ProtectedLayout>
      <UsersTable />
    </ProtectedLayout>
  );
};

export default Users;
