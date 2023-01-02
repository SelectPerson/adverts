export const enum userRoleTypes {
  ADMIN = 'admin',
  USER = 'user',
}

export interface iUser {
  id: number;
  name?: string;
  email: string;
  phone?: string;
  role?: userRoleTypes;
  password: string;
}
