import { ApiError } from "./ApiError.util.js";

export const generateAccessRefreshTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    // update refreshToken field in user collection in database
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, user };
  } catch {
    throw new ApiError(500, "failed to generate access and refresh tokens");
  }
};
