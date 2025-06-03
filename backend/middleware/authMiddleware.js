import { verifyToken } from "../helper/jwtHelper.js";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token
  if (!token) {
    return res.status(401).json({ error: true, message: "Access denied" });
  }

  try {
    const authData = verifyToken(token);
    // console.log("Authenticated user:", authData);
    req.user = authData;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: true, message: "Token expired" });
    }
    return res.status(400).json({ error: true, message: "Invalid token" });
  }
};

export default authMiddleware;
