// Global Cookies settings
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "None", // sameSite false since frontend and backend on different sites, will have to whitelist the front end in CORS
};
