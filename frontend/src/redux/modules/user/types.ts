export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: Date;
};

export type UserState = {
  isLoading: boolean;
  user: IUser;
  token: string;
  error: any;
};

export type ILoginData = {
  username: string;
  password: string;
};
