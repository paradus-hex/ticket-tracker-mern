import React from 'react';
import ProtectedLayout from '@/components/common/ProtectedLayout';
import { Ticket } from '@/components/features/tickets/Ticket';
import { Box } from '@mui/material';
import { useGetTicket } from '@/hooks/ticket.hook';
import { useRouter } from 'next/router';

const TicketComponent = () => {
  const { ticketId } = useRouter().query;
  const { data, isLoading, isSuccess } = useGetTicket(ticketId as string);

  return (
    <ProtectedLayout>
      {isLoading && <Box>Loading....</Box>}
      <Box className='flex justify-center'>
        {isSuccess && <Ticket ticket={data.data} />}
      </Box>
    </ProtectedLayout>
  );
};

export default TicketComponent;
