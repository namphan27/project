import { Request, Response } from 'express';

export const uploadImage = (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ 
      success: false, 
      message: "Không có file nào được tải lên!" 
    });
  }

  // const imageUrl = `${req.protocol}://${req.get('host')}/media/${file.filename}`;
  const imageUrl = `/media/${file.filename}`;

  res.status(200).json({ 
    success: true, 
    url: imageUrl 
  });
};