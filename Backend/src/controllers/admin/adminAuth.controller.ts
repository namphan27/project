import { Request, Response } from "express";
import { userService } from "../../services/user.service";

export const adminUserController = {
  getAll: async (req: Request, res: Response) => {
    const users = await userService.getAll();
    res.json(users);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await userService.update(id, req.body);
    res.json(user);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await userService.delete(id);
    res.json({ success: true });
  },
};
