import { Request, Response } from "express";
export const indexController = {
  index: (req: Request, res: Response) => {
    res.json({
      message: "API running successfully 🚀",
    });
  },
};
