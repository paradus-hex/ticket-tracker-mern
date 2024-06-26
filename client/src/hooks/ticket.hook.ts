import ticketId from '@/pages/projects/[projectId]';
import { AuthenticationTokenKey } from '@/utils/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface UpdateTicketPayloadType {
  id: string,
  title: string,
  description: string,
  status: 'INPROGRESS' | 'RESOLVED' | 'UNASSIGNED',
  category: 'FEATURE' | 'BUGFIX'
}


const createTicket = (createTicketPayload: {
  title: string,
  description: string,
  projectId: string
}) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/ticket/`,
    createTicketPayload, {
    headers: {
      token: localStorage.getItem(AuthenticationTokenKey)
    }
  }
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
  return axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/ticket/${projectId}`, {
    data: { ticketId }, headers: {
      token: localStorage.getItem(AuthenticationTokenKey)
    }
  },);
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
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/ticket/${ticketID}`);
};

export const useGetTicket = (ticketID: string) => {
  return useQuery(['get-current-ticket', ticketID], () => getTicket(ticketID), {
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

const assignUsers = ({ ticketId, userIds }: { ticketId: string, userIds: string[] }) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/ticket/${ticketId}`, {
    userIds
  }, {
    headers: {
      token: localStorage.getItem(AuthenticationTokenKey)
    }
  })
}

export const useAssignUsers = (ticketId: string) => {
  const queryClient = useQueryClient();
  return useMutation(assignUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-current-ticket', ticketId]);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};



const updateTicket = ({
  id,
  title,
  description,
  status,
  category
}: UpdateTicketPayloadType) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/ticket/`,
    {
      id,
      title,
      description,
      status, category
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
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/ticket/project/${projectId}`);
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


const unAssignUser = ({ userId, ticketId }: { userId: string, ticketId: string }) => {
  return axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/ticket`, {
    data: { ticketId, userId }, headers: {
      token: localStorage.getItem(AuthenticationTokenKey)
    }
  });
};

export const useUnAssignUser = (ticketId: string) => {
  const queryClient = useQueryClient();
  return useMutation(unAssignUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-current-ticket', ticketId]);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};


const addComment = ({ ticketId, userId, content }: { ticketId: string, userId: string, content: string }) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/ticket/${ticketId}/comment/${userId}`, {
    content
  }, {
    headers: {
      token: localStorage.getItem(AuthenticationTokenKey)
    }
  })
}

export const useAddComment = (ticketId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-current-ticket', ticketId]);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

const deleteComment = ({ ticketId, userId, id }: { ticketId: string, userId: string, id: string }) => {
  return axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/ticket/${ticketId}/comment/${userId}`, {
    data: { id }, headers: {
      token: localStorage.getItem(AuthenticationTokenKey)
    }
  })
}

export const useDeleteComment = (ticketId: string) => {
  const queryClient = useQueryClient();
  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-current-ticket', ticketId]);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

const editComment = ({ ticketId, userId, id, content }: { ticketId: string, userId: string, id: string, content: string }) => {
  return axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/ticket/${ticketId}/comment/${userId}`,
    { id, content }, {
    headers: {
      token: localStorage.getItem(AuthenticationTokenKey)
    }
  }
  )
}

export const useEditComment = (ticketId: string) => {
  const queryClient = useQueryClient();
  return useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-current-ticket', ticketId]);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};