import React from 'react';
import { Box } from '@mui/material';
import UserCard, { User } from '@/components/features/user/UserCard';
import useCurrentUser from '@/hooks/useCurrentUser';
import ProtectedLayout from '@/components/common/ProtectedLayout';
import { useRouter } from 'next/router';

const Projects = () => {
  const router = useRouter();
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
      <div className='flex flex-col items-center justify-center gap-4'>
        <button
          className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
          onClick={() => router.push('/')}
        >
          Sign Out
        </button>
      </div>
    </ProtectedLayout>
  );
};

export default Projects;
