export type UserData = {
  name: string;
  email: string;
  password: string;
};

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string; 
  createdAt: Date | null;
  updatedAt: Date | null;
}