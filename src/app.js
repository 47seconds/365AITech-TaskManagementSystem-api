import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  userRouter,
  taskRouter
} from "./routes/index.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const apiRoute = express.Router();
apiRoute.use("/auth", userRouter);
apiRoute.use("/tasks", taskRouter);

app.use("/api", apiRoute);

export { app };
