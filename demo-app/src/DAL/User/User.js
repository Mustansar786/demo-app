import { invokeApi } from '../../bl_libs/invokeApi';

export const addUser = async (data) => {
  const requestObj = {
    path: `app/add_user`,
    method: 'POST',
    headers: {},
    postData: data
  };
  return invokeApi(requestObj);
};

export const userList = async () => {
  const requestObj = {
    path: `app/get_user`,
    method: 'GET',
    headers: {},
  };
  return invokeApi(requestObj);
};

export const getUser = async (id) => {
  const requestObj = {
    path: `app/get_user/${id}`,
    method: 'GET',
    headers: {},
  };
  return invokeApi(requestObj);
};

export const updateUser = async (id, data) => {
  const requestObj = {
    path: `app/update_user/${id}`,
    method: 'PUT',
    headers: {},
    postData: data
  };
  return invokeApi(requestObj);
};

export const userDelete = async (id) => {
  const requestObj = {
    path: `app/delete_user/${id}`,
    method: 'DELETE',
    headers: {},
  };
  return invokeApi(requestObj);
};
