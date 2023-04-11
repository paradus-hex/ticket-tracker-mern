import React from 'react';
import { useRouter } from 'next/router';
import TicketsTable from '@/components/features/tickets/TicketTable';
import ProtectedLayout from '@/components/common/ProtectedLayout';

const ticketId = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { projectId } = useRouter().query;
  return (
    <ProtectedLayout>
      <TicketsTable projectId={projectId as string} />
    </ProtectedLayout>
  );
};

export default ticketId;
