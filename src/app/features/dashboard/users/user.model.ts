export interface IUser {
    id: string;
    username?: string | null;
    role?: Role | null;
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }