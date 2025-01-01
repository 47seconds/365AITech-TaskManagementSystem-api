import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter, taskRouter, categoryRouter } from "./routes/index.js";

const app = express();

// credentials true to proceed with cookies too
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
apiRoute.use("/auth", userRouter); // user route
apiRoute.use("/tasks", taskRouter); // task route
apiRoute.use("/categories", categoryRouter); // category route

// API home route
app.use("/api", apiRoute);

export { app };
