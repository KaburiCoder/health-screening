export interface User {
  userId: string;
  roomKey: string;
  email: string;
  orgName: string;
  createdAt?: Date;
  updatedAt?: Date;
  admin?: boolean;
  iat?: number;
  exp?: number;
} 