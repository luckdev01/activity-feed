import { ILoginData } from '@/redux/modules/user/types';
import { axg, axp } from './axios-config';

export const UserAPI = {
  login: async function (data: ILoginData) {
    return axp(`/auth/login`, data);
  },
  getProfile: async function () {
    return axg('/auth/user');
  },
};
