import { ILoginData } from '../redux/modules/user/types';
import { axg, axp } from './axios-config';

export const UserAPI = {
  login: async function (data: ILoginData) {
    await axp(`/auth/login`, data);
  },
  getProfile: async function (id: number) {
    return axg(`/user/${id}`);
  },
};
