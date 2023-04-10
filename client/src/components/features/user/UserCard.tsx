import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import CustomAvatar from './CustomAvatar';

export interface User {
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

const CustomCard = styled(Card)`
  width: 345px;
  margin: 1rem;
`;

const CustomCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserCard = ({ user }: { user: User }) => {
  if (!user) {
    return null;
  }

  const { name, email, role } = user;

  return (
    <CustomCard className='shadow-lg'>
      <CustomCardContent>
        <CustomAvatar name={name} />
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {email}
        </Typography>
        <Typography variant='body1' color='text.primary' className='mt-2'>
          Role: {role}
        </Typography>
      </CustomCardContent>
    </CustomCard>
  );
};

export default UserCard;
