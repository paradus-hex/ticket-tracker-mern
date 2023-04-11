import { AuthenticationTokenKey } from '@/utils/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface UpdateTicketPayloadType {
  projectId: string
  ticketId: string,
  title: string,
  description: string,
  status: 'INPROGRESS' | 'RESOLVED' | 'UNASSIGNED'
}


const createTicket = ({ projectId, createTicketPayload }: {
  projectId: string, createTicketPayload: {
    title: string,
    description: string,
    projectId: string
  }
}) => {
  return axios.post(
    `http://localhost:8000/api/v1/ticket/${projectId}`,
    createTicketPayload
  );
};

export const useCreateTicket = (projectID: string) => {
  const queryClient = useQueryClient();
  return useMutation(createTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects-tickets', projectID]);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

const deleteTicket = ({ projectId, ticketId }: { projectId: string, ticketId: string }) => {
  return axios.delete(`http://localhost:8000/api/v1/ticket/${projectId}`, {
    data: { ticketId }
  });
};

export const useDeleteTicket = (projectID: string) => {
  const queryClient = useQueryClient();
  return useMutation(deleteTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects-tickets', projectID]);
      console.log(
        queryClient.invalidateQueries(['get-projects-tickets', projectID])
      );
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};


const getTicket = (ticketID: string) => {
  return axios.get(`http://localhost:8000/api/v1/ticket/${ticketID}`);
};

export const useGetTicket = (ticketID: string) => {
  return useQuery(['get-current-ticket', ticketID], () => getTicket(ticketID), {
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

const updateTicket = ({
  projectId,
  ticketId,
  title,
  description,
  status
}: UpdateTicketPayloadType) => {
  return axios.put(
    `http://localhost:8000/api/v1/ticket/${projectId}/${ticketId}`,
    {
      title,
      description,
      status,
    },
    {
      headers: {
        token: localStorage.getItem(AuthenticationTokenKey)
      }
    }
  );
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-tickets']);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

const getProjectTickets = (projectId: string) => {
  return axios.get(`http://localhost:8000/api/v1/ticket/`, {
    params: {
      projectId
    }
  });
};

export const useGetProjectTickets = (projectID: string) => {
  return useQuery(
    ['get-projects-tickets', projectID],
    () => getProjectTickets(projectID),
    {
      onError: (err: any) => {
        console.log(err.response);
      }
    }
  );
};