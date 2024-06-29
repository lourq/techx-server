// Description: This file contains the middleware for CORS and IP restriction.
export const corsMiddleware = (req, res, next) => {
  const allowedOrigins = [
    "https://next-techx.vercel.app",
    "http://localhost:3000",
  ];
  const allowedIPs = [
    '76.76.21.168',
    '76.76.21.98'
  ];
  const origin = req.headers.origin;
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (allowedOrigins.includes(origin) && allowedIPs.includes(clientIP)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "null");
    return res.status(403).json({ message: 'Forbidden' });
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
};
