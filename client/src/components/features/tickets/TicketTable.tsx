import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  type GridRowModesModel,
  GridRowModes,
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
  type GridRowId,
  type GridRowModel
} from '@mui/x-data-grid';
import router from 'next/router';
import CreateTicket from './CreateTicket';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Container } from '@mui/material';
import {
  useCreateTicket,
  useGetProjectTickets,
  useUpdateTicket,
  UpdateTicketPayloadType,
  useDeleteTicket
} from '@/hooks/ticket.hook';

export default function TicketsTable({ projectId }: { projectId: string }) {
  const { data: TicketsData, isSuccess } = useGetProjectTickets(projectId);

  const { mutateAsync: createTicket } = useCreateTicket(projectId);

  const { mutateAsync: updateTicket } = useUpdateTicket();
  const { mutateAsync: deleteTicket } = useDeleteTicket(projectId);
  const { data: userSession } = useCurrentUser();

  const [rows, setRows] = React.useState(TicketsData?.data ?? []);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    if (isSuccess) setRows(TicketsData?.data ?? []);
    console.log(TicketsData?.data);
  }, [isSuccess, TicketsData?.data]);

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteTicket({ projectId, ticketId: id as string });
    setRows(rows.filter((row: any) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow } as Partial<UpdateTicketPayloadType>;
    const { title, description, id, status } = updatedRow;

    if (id && title && description && status) {
      void updateTicket({
        id,
        title,
        description,
        status
      });
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const adminColumns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1, editable: true },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      editable: true
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'singleSelect',
      valueOptions: ['UNASSIGNED', 'INPROGRESS', 'RESOLVED'],
      flex: 1,
      editable: true
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label='Save'
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />
        ];
      }
    }
  ];

  const userColumns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'status',
      headerName: 'Status',
      type: 'singleSelect',
      valueOptions: ['UNASSIGNED', 'INPROGRESS', 'RESOLVED'],
      flex: 1,
      editable: true
    }
  ];

  return (
    <Box className='flex flex-col items-center justify-center'>
      <Container>
        <Box className='self-end py-5'>
          <CreateTicket projectId={projectId} createTicket={createTicket} />
        </Box>
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary'
            },
            '& .textPrimary': {
              color: 'text.primary'
            }
          }}
        >
          {userSession && userSession.user.role === 'ADMIN' ? (
            <DataGrid
              rows={rows}
              columns={adminColumns}
              editMode='row'
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              processRowUpdate={processRowUpdate}
              onRowClick={(params) => {
                void router.push(`/tickets/${params.id}`);
              }}
            />
          ) : (
            <DataGrid
              rows={rows}
              columns={userColumns}
              onRowClick={(params) => {
                void router.push(`/tickets/${params.id}`);
              }}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}
