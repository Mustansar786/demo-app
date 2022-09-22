import { invokeApi } from '../../bl_libs/invokeApi';

export const login = async (data) => {
  const requestObj = {
    path: `auth/admin/login`,
    method: 'POST',
    headers: {
      // 'x-sh-auth': 1234
    },
    postData: data
  };
  return invokeApi(requestObj);
};

export const logout = async (data) => {
  const requestObj = {
    path: `app/logout`,
    method: 'POST',
    headers: {
      // 'x-sh-auth': 1234
    },
    postData: data
  };
  return invokeApi(requestObj);
};

export const register = async (data) => {
  const requestObj = {
    path: `auth/admin/register`,
    method: 'POST',
    headers: {
      // 'x-sh-auth': localStorage.getItem('token')
    },
    postData: data
  };
  return invokeApi(requestObj);
};

