// src/components/Ticket.tsx
import { useAssignUsers, useUnAssignUser } from '@/hooks/ticket.hook';
import useCurrentUser from '@/hooks/useCurrentUser';
import {
  Typography,
  Paper,
  Chip,
  Box,
  Button,
  Modal,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container
} from '@mui/material';
import React from 'react';
import Comment from '../comments/Comment';
import CommentForm from '../comments/CommentForm';

interface AssignedUser {
  id: string;
  name: string;
}

interface AvailableUser {
  id: string;
  name: string;
}

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  upvoteCount: number;
}

export interface TicketProps {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: string;
  assignedUsers: AssignedUser[];
  availableUsers: AvailableUser[];
  comments: Comment[];
}

export const Ticket = ({
  ticket,
  ticketId
}: {
  ticket: TicketProps;
  ticketId: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [newComment, setNewComment] = React.useState('');
  const addComment = () => {
    // Dummy function to simulate adding a new comment
    // You'll need to replace this with an actual API call to add a comment
    console.log('New comment:', newComment);
    setNewComment('');
  };
  const { mutateAsync } = useAssignUsers(ticketId);
  const { mutateAsync: unAssign } = useUnAssignUser(ticketId);
  const { data: sessionData } = useCurrentUser();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    mutateAsync({ ticketId, userIds: selectedUsers });
    handleClose();
  };
  const handleDelete = (userId: string) => {
    unAssign({ ticketId, userId });
  };

  React.useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedUsers(event.target.value as string[]);
  };

  return (
    <Box className='flex justify-center items-center'>
      <Paper
        sx={{
          padding: '2rem',
          marginBottom: '1rem',
          width: 'fit-content',
          height: 'fit-content'
        }}
      >
        <Typography variant='h5' className='mb-2'>
          {ticket.title}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {ticket.description}
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Status: <Chip label={ticket.status} className='m-1' />
        </Typography>
        <Typography variant='subtitle1'>Assigned Users:</Typography>
        <Box className='flex '>
          {ticket.assignedUsers && ticket.assignedUsers.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}
            >
              {ticket.assignedUsers.map((user) => (
                <Chip
                  onDelete={
                    sessionData && sessionData.user.role === 'ADMIN'
                      ? () => handleDelete(user.id)
                      : undefined
                  }
                  key={user.id}
                  label={user.name}
                  className='m-1'
                />
              ))}
            </Box>
          )}

          {sessionData && sessionData.user.role === 'ADMIN' && (
            <Button
              onClick={handleOpen}
              variant='contained'
              className='bg-cyan-700 m-1 w-8 h-8'
            >
              +ADD
            </Button>
          )}
        </Box>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4
            }}
          >
            <Typography variant='h6' gutterBottom>
              Assign Users
            </Typography>
            <FormControl fullWidth>
              <Select
                id='assign-users'
                multiple
                value={selectedUsers}
                onChange={handleChange}
                renderValue={(selected) => (
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
                  >
                    {(selected as string[]).map((value) => (
                      <Chip
                        key={value}
                        label={
                          ticket.availableUsers.find(
                            (user) => user.id === value
                          )?.name
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {ticket.availableUsers &&
                  ticket.availableUsers.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '1rem'
              }}
            >
              <Button onClick={handleClose} color='error'>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                color='primary'
                variant='contained'
                className='bg-cyan-700 m-1 w-8 h-8'
              >
                Assign
              </Button>
            </Box>
          </Box>
        </Modal>
      </Paper>
      <Container className='max-h-screen'>
        <Comment />
      </Container>
    </Box>
  );
};
