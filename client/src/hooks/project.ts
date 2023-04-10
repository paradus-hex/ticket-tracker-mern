import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface CreateProjectPayloadType {
  title: string,
  description: string
}

const createProject = (createProjectPayload: CreateProjectPayloadType) => {
  return axios.post(
    `http://localhost:8000/api/v1/project`,
    createProjectPayload,
    {
      headers: {
        token: localStorage.getItem('token')
      }
    }
  );
};

const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects']);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

export default useCreateProject;
