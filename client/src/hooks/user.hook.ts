import { AuthenticationTokenKey } from '@/utils/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


export interface UpdateRoleUserPayloadType {
  id: string,
  role: "ADMIN" | "USER"
}

const addNewUser = (registerPayload: {
  name: string, email: string, password: string
}) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user`, registerPayload);
};

export const useRegisterUser = (onSuccess: any) => {
  return useMutation(addNewUser, {
    onSuccess,
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};


const loginUser = (loginPayload: {
  email: string, password: string
}) => {
  console.log('here');
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/login`, loginPayload);
};

export const useLoginUser = (onSuccess: any, onError: any) => {
  return useMutation(loginUser, {
    onSuccess,
    onError
  });
};

const getAllUsers = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user`);
};

export const useGetAllUsers = () => {
  return useQuery(['get-users'], getAllUsers, {
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

export const roleUpdateUser = ({ id, role }: UpdateRoleUserPayloadType) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/${id}`,
    {
      role
    },
    {
      headers: {
        token: localStorage.getItem(AuthenticationTokenKey)
      }
    }
  );
};

export const useRoleUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(roleUpdateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-users']);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

const deleteUser = (userID: string) => {
  return axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/${userID}`, {
    headers: {
      token: localStorage.getItem(AuthenticationTokenKey)
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-users']);
    },
    onError: (err: any) => {
      console.log(err.response.data);
    }
  });
};

