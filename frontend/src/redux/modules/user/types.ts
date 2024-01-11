export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  profileImage: string;
};

export type UserState = {
  isLoading: boolean;
  user: IUser;
  isAuthenticated: boolean;
  error: any;
};

export type ILoginData = {
  username: string;
  password: string;
};
