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

export default function ProjectsTable() {
  const { data: projectsData, isSuccess } = useGetAllProjects();

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

  const columns: GridColDef[] = [
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
            onClick={handleDeleteClick(id as string)}
            color='inherit'
          />
        ];
      }
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
        <DataGrid
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          onRowClick={(params) => {
            void router.push(`projects/${params.id}`);
          }}
        />
      </Box>
    </Box>
  );
}
