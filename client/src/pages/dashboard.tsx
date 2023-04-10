import React from 'react';
import { Box } from '@mui/material';
import UserCard, { User } from '@/components/features/user/UserCard';
import useCurrentUser from '@/hooks/useCurrentUser';
import ProtectedLayout from '@/components/common/ProtectedLayout';

const Projects = () => {
  const { data } = useCurrentUser();

  let clickedUser;

  if (data) {
    clickedUser = {
      name: data.user.name,
      email: data.user.email,
      role: data.user.role
    } as User;
  }

  return (
    <ProtectedLayout>
      {clickedUser && (
        <Box className='flex justify-center'>
          <UserCard user={clickedUser} />
        </Box>
      )}
    </ProtectedLayout>
  );
};

export default Projects;
