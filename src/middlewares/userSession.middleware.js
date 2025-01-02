import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { COOKIE_OPTIONS } from "../config/cookie.config.js";
import { generateAccessRefreshTokens } from "../utils/accessRefreshTokenGeneration.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

// Main functional function for validating access and refresh tokens for authentication and returning user data to response or to verifyJWT middleware to append that data to request as req.user
// userSession can be used as middleware as well as a helper funtion by verifyJWT middleware. If used as middleware, next should be parsed and will return response or next() upon situations.
// Else, it will return user data as response or false to verifyJWT to append it to request to make req.user

// DON'T USE ASYNCHANDLER HERE! The call won't become async with asyncHandler, which is needed for verifyJWT
export const userSession = async (req, res, next) => {
  // extract access and refresh tokens cookies from user
  const cookieAccessToken =
    req.cookies.accessToken ||
    (req.header("Authorization") || "").replace("Bearer", "").trim();

  const cookieRefreshToken = req.cookies.refreshToken;

  // If both are missing, therefore user needs to login again.
  if (!(cookieAccessToken || cookieRefreshToken)) return next ? next() : false;

  let decodedAccessToken;

  try {
    // try decoding access token with JWT
    decodedAccessToken = jwt.verify(
      cookieAccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
  } catch (error) {
    // If failed to decode access token
    if (error.name === "TokenExpiredError") {
      // If error was TokenExpiredError for access token
      try {
        // if access is expired, try decoding refresh token
        const decodedRefreshToken = jwt.verify(
          cookieRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const tokenUser = await User.findById(decodedRefreshToken._id);
        if (!tokenUser) return next ? next() : false;

        // if Refresh Token worked, generate new access and refresh tokens
        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          user,
        } = await generateAccessRefreshTokens(tokenUser);

        // remove password (hashed) and refresh token from response, as it is prone to Man-in-the-Middle attack
        const loggedInUser = { ...user };
        delete loggedInUser._doc.password;
        delete loggedInUser._doc.refreshToken;

        // return response as user details as res or for verifyJWT to append it to req as req.user
        return next
          ? res
              .status(200)
              .cookie("accessToken", newAccessToken, {
                ...COOKIE_OPTIONS,
                maxAge:
                  86400000 * Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRY),
              }) // 86400000 seconds for 1 Day * number of days
              .cookie("refreshToken", newRefreshToken, {
                ...COOKIE_OPTIONS,
                maxAge:
                  86400000 * Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRY),
              }) // 86400000 seconds for 1 Day * number of days
              .json(
                new ApiResponse(
                  200,
                  {},
                  loggedInUser._doc,
                  "user already logged in"
                )
              )
          : loggedInUser._doc;
      } catch {
        return next ? next() : false; // Either refresh token too is expired, or encountered some other error, try re-logging-in user
      }
    } else return next ? next() : false; // If error encountered was something else, try re-logging-in user
  }

  // If access token worked
  let tokenUser = await User.findById(decodedAccessToken._id);
  if (!tokenUser) return next ? next() : false;

  // generate new access and refresh tokens
  const {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user,
  } = await generateAccessRefreshTokens(tokenUser);

  // remove password (hashed) and refresh token from response, as it is prone to Man-in-the-Middle attack
  const loggedInUser = { ...user };
  delete tokenUser._doc.password;
  delete loggedInUser._doc.refreshToken;

  // return response as user details as res or for verifyJWT to append it to req as req.user
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
