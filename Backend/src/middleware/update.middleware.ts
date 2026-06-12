import multer from "multer";
import path from "path";
// import { Request } from "express";
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.join(__dirname, "../upload");
    console.log("📁 Upload path:", uploadPath);
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// const fileFilter = (
//   _req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback,
// ) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Chỉ chấp nhận file ảnh!"));
//   }
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter,
// });
const upload = multer({ storage: storage });
export default upload;
