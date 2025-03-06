// /types/user.d.ts

export interface IUser {
    _id?: string;
    name?: string;
    email: string;
    phone?: string;
    passwordHash?: string;
    role?: 'admin' | 'staff' | 'customer';
    createdAt?: Date;
  }
  