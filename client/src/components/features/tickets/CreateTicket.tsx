import React from 'react';
// Add the following imports to the top of your file
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: 'INPROGRESS' | 'RESOLVED' | 'UNASSIGNED';
}

const CreateTicket = ({
  rows,
  setRows,
  createTicket,
  projectId
}: {
  rows?: Ticket[];
  setRows?: React.Dispatch<React.SetStateAction<Ticket[]>>;
  createTicket: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    any,
    {
      title: string;
      description: string;
      projectId: string;
    },
    unknown
  >;
  projectId: string;
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newTicketTitle, setNewTicketTitle] = React.useState('');
  const [newTicketDescription, setNewTicketDescription] = React.useState('');

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleAddTicket = () => {
    if (newTicketTitle && newTicketDescription) {
      const newTicket = {
        title: newTicketTitle,
        description: newTicketDescription,
        projectId
      };

      console.log(newTicket, 'here i am');

      createTicket(newTicket);

      // Clear the input fields
      setNewTicketTitle('');
      setNewTicketDescription('');

      // Close the dialog
      handleClose();
    }
  };
  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Add Ticket
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the ticket title and description.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Title'
            type='text'
            fullWidth
            value={newTicketTitle}
            onChange={(e) => setNewTicketTitle(e.target.value)}
          />
          <TextField
            margin='dense'
            id='description'
            label='Description'
            type='text'
            fullWidth
            value={newTicketDescription}
            onChange={(e) => setNewTicketDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleAddTicket} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTicket;
