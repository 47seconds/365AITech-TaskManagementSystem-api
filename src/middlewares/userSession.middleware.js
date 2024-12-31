import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { COOKIE_OPTIONS } from "../config/cookie.config.js";
import { generateAccessRefreshTokens } from "../utils/accessRefreshTokenGeneration.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

// DON'T USE ASYNCHANDLER HERE! The call won't become async with asyncHandler, which is needed for verifyJWT
export const userSession = async (req, res, next) => {
  const cookieAccessToken =
    req.cookies.accessToken ||
    (req.header("Authorization") || "").replace("Bearer", "").trim();
  const cookieRefreshToken = req.cookies.refreshToken;

  if (!(cookieAccessToken && cookieRefreshToken)) return next ? next() : false;

  let decodedAccessToken;

  try {
    decodedAccessToken = jwt.verify(
      cookieAccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      try {
        const decodedRefreshToken = jwt.verify(
          cookieRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const tokenUser = await User.findById(decodedRefreshToken._id);
        if (!tokenUser) return next ? next() : false;

        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          user,
        } = await generateAccessRefreshTokens(tokenUser);
        const loggedInUser = { ...user };
        delete loggedInUser._doc.password;
        delete loggedInUser._doc.refreshToken;

        return next
          ? res
              .status(200)
              .cookie("accessToken", newAccessToken, {
                ...COOKIE_OPTIONS,
                maxAge:
                  86400000 * Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRY),
              }) // 1 Day
              .cookie("refreshToken", newRefreshToken, {
                ...COOKIE_OPTIONS,
                maxAge:
                  86400000 * Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRY),
              }) // 10 Days
              .json(
                new ApiResponse(
                  200,
                  {},
                  loggedInUser._doc,
                  "user already logged in",
                )
              )
          : loggedInUser._doc;
      } catch {
        return next ? next() : false;
      }
    } else return next ? next() : false;
  }

  let tokenUser = await User.findById(decodedAccessToken._id);
  if (!tokenUser) return next ? next() : false;

  const {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user,
  } = await generateAccessRefreshTokens(tokenUser);
  const loggedInUser = { ...user };
  delete tokenUser._doc.password;
  delete loggedInUser._doc.refreshToken;

  return next
    ? res
        .status(200)
        .cookie("accessToken", newAccessToken, {
          ...COOKIE_OPTIONS,
          maxAge: 86400000 * process.env.ACCESS_TOKEN_COOKIE_EXPIRY,
        }) // 1 Day
        .cookie("refreshToken", newRefreshToken, {
          ...COOKIE_OPTIONS,
          maxAge: 86400000 * Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRY),
        }) // 10 Days
        .json(
          new ApiResponse(200, {}, loggedInUser._doc, "user already logged in")
        )
    : loggedInUser._doc;
};
