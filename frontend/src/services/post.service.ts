import { IFetchPostParams } from '@/redux/modules/posts/types';
import { axg, axp, axd, axu } from './axios-config';

export const PostAPI = {
  get: async function (id: number) {
    return axg(`/posts/${id}`);
  },
  getAll: async function (
    query: object,
    params?: IFetchPostParams | undefined,
  ) {
    return axg('/posts', { ...query, ...params });
  },
  create: async function (data: any) {
    await axp(`/posts`, data);
  },
  update: async function (id: number, data: any) {
    await axu(`/posts/${id}`, data);
  },
  delete: async function (id: number) {
    return axd(`/posts/${id}`);
  },
};
