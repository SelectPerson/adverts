export type userRoleTypes = 'admin' | 'user';

export interface iUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: userRoleTypes;
  password: string;
}
