export interface IUser {
    id: number;
    username?: string | null;
    role?: Role | null;
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }