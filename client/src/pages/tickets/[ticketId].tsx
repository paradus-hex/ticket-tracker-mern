import React from 'react';
import ProtectedLayout from '@/components/common/ProtectedLayout';
import { Ticket } from '@/components/features/tickets/Ticket';
import { Box } from '@mui/material';

const TicketComponent = () => {
  const tickets = {
    id: 'cuid1',
    title: 'Ticket 1',
    description: 'This is a description for Ticket 1.',
    project: {
      id: 'project1',
      name: 'Project 1'
    },
    projectId: 'project1',
    status: 'UNASSIGNED',
    assignedUser: [
      {
        id: 'user1',
        name: 'User 1'
      }
    ],
    availableUsers: [
      {
        id: '222',
        name: 'Somehwta'
      }
    ]
  };
  return (
    <ProtectedLayout>
      <Box className='flex justify-center'>
        <Ticket ticket={tickets} />
      </Box>
    </ProtectedLayout>
  );
};

export default TicketComponent;
