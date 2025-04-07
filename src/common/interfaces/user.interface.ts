export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  hash: string | null;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isActive: boolean;
  isAdmin: boolean;
}

export interface IUserUpdate extends Partial<IUserCreate> {
  hash?: string | null;
}

export interface IUserPaginate {
  params: URLSearchParams;
  total: number;
  data: IUser[];
}
