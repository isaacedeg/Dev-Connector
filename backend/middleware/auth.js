import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  
  if(!req.user){
    return res.status(406).json({
        success: false,
        message: "Please log in",
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
