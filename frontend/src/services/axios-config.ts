import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      // logout
    }

    return Promise.reject(error);
  },
);

export const axg = async (url: string, params = {}) => {
  const res = await axiosInstance({
    method: 'get',
    url,
    params,
  });

  return res.data;
};

export const axp = async (url: string, data?: unknown) => {
  const res = await axiosInstance({
    method: 'post',
    url,
    data,
  });

  return res.data;
};

export const axu = async (url: string, data: unknown) => {
  const res = await axiosInstance({
    method: 'put',
    url,
    data,
  });

  return res.data;
};

export const axpatch = async (url: string, data: unknown) => {
  const res = await axiosInstance({
    method: 'patch',
    url,
    data,
  });

  return res.data;
};

export const axd = async (url: string) => {
  const res = await axiosInstance({
    method: 'delete',
    url,
  });

  return res.data;
};

export default axiosInstance;
