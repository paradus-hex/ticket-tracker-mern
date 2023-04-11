import React, { useState } from 'react';
import { TextField, Box, Stack, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import ProtectedLayout from '@/components/common/ProtectedLayout';
import {
  CreateProjectPayloadType,
  useCreateProject
} from '@/hooks/project.hook,';

const CreateProject = () => {
  const { mutateAsync } = useCreateProject();
  const router = useRouter();

  const [projectPayload, setProjectPayload] =
    useState<CreateProjectPayloadType>({} as CreateProjectPayloadType);

  const handleSubmit = async () => {
    try {
      await mutateAsync(projectPayload);
      await router.push('/projects');
      return;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProtectedLayout>
      <Stack className='flex items-center justify-center' gap={5}>
        <Typography variant='h5'>Create A Project</Typography>
        <TextField
          helperText='Enter the title of the project'
          id='project-title'
          label='Title'
          variant='filled'
          sx={{ width: '20%' }}
          onChange={(e) => {
            setProjectPayload({ ...projectPayload, title: e.target.value });
          }}
        />
        <TextField
          helperText='Please enter the project description '
          id='project-description'
          label='Description'
          variant='filled'
          multiline
          rows={5}
          sx={{ width: '30%' }}
          onChange={(e) => {
            setProjectPayload({
              ...projectPayload,
              description: e.target.value
            });
          }}
        />
        <Button variant='outlined' onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </ProtectedLayout>
  );
};

export default CreateProject;
