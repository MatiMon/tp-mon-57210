export interface IUser {
    id: string;
    username?: string | null;
    email?: string | null;
    password?: string | null;
    role?: Role | null;
    token?: string;
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }