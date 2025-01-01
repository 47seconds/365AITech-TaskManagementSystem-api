import { Router } from "express";
import {
  userRegistration,
  userLogin,
  userLogout,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userSession } from "../middlewares/userSession.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(userRegistration); // since user registering first time, no need to authenticate
userRouter.route("/login").post(userSession, userLogin); // since user already on login page, therefore can use userSession middleware
userRouter.route("/logout").get(verifyJWT, userLogout); // user needs to be logged in to log out

export { userRouter };
