import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const addNewUser = (registerPayload: {
  name: string, email: string, password: string
}) => {
  return axios.post('http://localhost:8000/api/v1/user', registerPayload);
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
  return axios.post('http://localhost:8000/api/v1/user/login', loginPayload);
};

export const useLoginUser = (onSuccess: any, onError: any) => {
  return useMutation(loginUser, {
    onSuccess,
    onError
  });
};


