// Description: This file contains the middleware functions for authentication.
export const extractToken = (req, res, next) => {
  const auth_header = req.headers["authorization"]; // Extract token from the request header
  const utoken = auth_header && auth_header.split(" ")[1];
  req.token = utoken;
  next();
};
