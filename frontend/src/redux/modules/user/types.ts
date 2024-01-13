export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  profileImage: string;
};

export type UserState = {
  isAuthenticated: boolean;
  login: {
    isLoading: boolean;
    error?: any;
  };
  user: {
    isLoading: boolean;
    data: IUser | null;
    error?: unknown;
  };
};

export type ILoginData = {
  username: string;
  password: string;
};

export type ITokenPayload = {
  token: string;
};
