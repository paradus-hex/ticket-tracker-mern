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
import { useRouter } from 'next/router';
import {
  useGetAllProjects,
  useUpdateProject,
  useDeleteProject,
  UpdateProjectPayloadType
} from '@/hooks/project.hook,';
import useCurrentUser from '@/hooks/useCurrentUser';

export default function ProjectsTable() {
  const { data: projectsData, isSuccess } = useGetAllProjects();
  const { data: userSession } = useCurrentUser();

  const router = useRouter();

  const { mutateAsync: deleteProject } = useDeleteProject();

  const { mutateAsync: updateProject } = useUpdateProject();

  const [rows, setRows] = React.useState(projectsData?.data.projects ?? []);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    if (isSuccess) setRows(projectsData?.data.projects);
    console.log();
  }, [isSuccess, projectsData?.data.projects, rows]);

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: string) => () => {
    deleteProject(id);
    setRows(rows.filter((row: any) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow } as UpdateProjectPayloadType;

    void updateProject({
      id: updatedRow.id,
      title: updatedRow.title,
      description: updatedRow.description
    } as UpdateProjectPayloadType);
    return updatedRow;
  };

  const adminsColumns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      width: 180,
      editable: true,
      flex: 1
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 360,
      editable: true,
      flex: 2
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
            onClick={handleDeleteClick(id as string)}
            color='inherit'
          />
        ];
      }
    }
  ];
  const usersColumns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      width: 180,
      editable: true,
      flex: 1
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 360,
      editable: true,
      flex: 2
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
            columns={adminsColumns}
            editMode='row'
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            processRowUpdate={processRowUpdate}
            onRowClick={(params) => {
              void router.push(`/projects/${params.id}`);
            }}
          />
        ) : (
          <DataGrid
            rows={rows}
            columns={usersColumns}
            onRowClick={(params) => {
              void router.push(`/projects/${params.id}`);
            }}
          />
        )}
      </Box>
    </Box>
  );
}
