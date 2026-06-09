import "express";
declare module "express" {
  export interface Request {
    user?: {
      id: number;
      name: string;
      email: string;
      role?: 'USER' | 'ADMIN';
      createdAt: Date | null;
      updatedAt: Date | null;
    };
    tokenJti?: string;
    tokenExp?: number;
  }
}
