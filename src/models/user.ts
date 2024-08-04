import { UserSettings } from "./user-settings";

export interface User {
  id: string;
  userId: string;
  roomKey: string;
  email: string;
  orgName: string;
  createdAt?: Date;
  updatedAt?: Date;
  admin?: boolean;
  iat?: number;
  exp?: number;

  settings?: UserSettings;
} 