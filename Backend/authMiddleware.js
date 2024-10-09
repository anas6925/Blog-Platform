import jwt from "jsonwebtoken";
import UserModel from "./models/signUpModel.js"; // Make sure to import your User model

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({
      status: "Failure",
      message: "No token provided",
      code: 401,
      data: [],
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key from .env

    // Find the user by ID from the token payload
    const user = await UserModel.findById(decoded.id).select("-password"); // Exclude password from user data

    if (!user) {
      return res.status(404).json({
        status: "Failure",
        message: "User not found",
        code: 404,
        data: [],
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "Failure",
      message: "Invalid token",
      code: 401,
      data: [],
    });
  }
};

export default authMiddleware;
