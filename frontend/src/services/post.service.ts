import { PaginationParams } from '../types/common';
import { axg, axp, axd, axu } from './axios-config';

export const PostAPI = {
  get: async function (id: number) {
    return axg(`/posts/${id}`);
  },
  getAll: async function (
    query: object,
    paginationParams?: PaginationParams | undefined,
  ) {
    return axg('/posts/', { ...query, ...paginationParams });
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
