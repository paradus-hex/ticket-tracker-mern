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
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import {
  useDeleteUser,
  useGetAllUsers,
  useRoleUpdateUser
} from '@/hooks/user.hook';
import { UpdateRoleUserPayloadType } from '@/hooks/user.hook';
import CustomAvatar from './CustomAvatar';

export default function UsersTable() {
  const { data: usersData, isSuccess } = useGetAllUsers();
  const { mutateAsync } = useRoleUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const router = useRouter();
  const { data: userSession } = useCurrentUser();

  const [rows, setRows] = React.useState(usersData?.data.users ?? []);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    if (isSuccess) setRows(usersData.data.users);
  }, [isSuccess, usersData?.data.users]);

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteUser(id as string);
    setRows(rows.filter((row: GridRowModel) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow } as Partial<UpdateRoleUserPayloadType>;
    const { id, role } = updatedRow;

    // Ensure both id and role are defined before calling mutateAsync
    if (id !== undefined && role !== undefined) {
      void mutateAsync({ id, role });
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const avatarColumn: GridColDef = {
    field: 'avatar',
    headerName: 'Avatar',
    width: 100,
    renderCell: (params) => {
      return (
        <Box className='mt-4'>
          <CustomAvatar
            sxProp={{ fontSize: 15, width: '40px', height: '40px' }}
            name={params.row.name}
          />
        </Box>
      );
    }
  };

  const adminColumns: GridColDef[] = [
    avatarColumn,
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'role',
      headerName: 'Role',
      type: 'singleSelect',
      valueOptions: ['ADMIN', 'USER'],
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
              icon={<SaveIcon className='text-orange-300' />}
              label='Save'
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon className='text-red-300' />}
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
            icon={<EditIcon className='text-orange-300' />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon className='text-red-300' />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />
        ];
      }
    }
  ];

  const userColumns: GridColDef[] = [
    avatarColumn,
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'role',
      headerName: 'Role',
      type: 'singleSelect',
      valueOptions: ['ADMIN', 'USER'],
      flex: 1,
      editable: true
    }
  ];

  return (
    <Box className='flex items-center justify-center'>
      <Box
        sx={{
          height: 500,
          width: '60%',
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
              void router.push(`/users/${params.id}`);
            }}
          />
        ) : (
          <DataGrid
            rows={rows}
            columns={userColumns}
            onRowClick={(params) => {
              void router.push(`/users/${params.id}`);
            }}
          />
        )}
      </Box>
    </Box>
  );
}
