import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import indexRoute from "./routes/index.route";
import adminRoute from "./routes/admin/admin.route";
// import "./workers/index.worker"
import path from "node:path";
import { errorHandlingMiddleware } from "./middleware/errorHandling.middleware";
const PORT: number = 3000;
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/media", express.static(path.join(__dirname, "upload")));
// app.use("/media", express.static(path.join(__dirname, "..", "public", "uploads")));
app.use(indexRoute);
app.use("/admin", adminRoute)

app.use(errorHandlingMiddleware);
app.listen(PORT, () => {
  console.log(`Start server: http://localhost:${PORT}`);
});
