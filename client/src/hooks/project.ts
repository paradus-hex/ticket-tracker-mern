import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface CreateProjectPayloadType {
  title: string,
  description: string
}
export interface UpdateProjectPayloadType {
  id: string,
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

export const useCreateProject = () => {
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


const updateProject = ({ id, title, description }: UpdateProjectPayloadType) => {
  return axios.put(
    `http://localhost:8000/api/v1/project/${id}`,
    {
      title,
      description
    },
    {
      headers: {
        token: localStorage.getItem('token')
      }
    }
  );
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects']);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

const getAllProjects = () => {
  return axios.get('http://localhost:8000/api/v1/project');
};

export const useGetAllProjects = () => {
  return useQuery(['get-projects'], getAllProjects, {
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

const deleteProject = (ProjectID: string) => {
  return axios.delete(`http://localhost:8000/api/v1/project/${ProjectID}`, {
    headers: {
      token: localStorage.getItem('token')
    }
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects']);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};