import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

// Middleware function for authenticating requests using JWT
export const authenticate = (req, res, next) => {
  // Extracting the JWT token from the Authorization header
  const token = req.header("Authorization");

  // Checking if the token is present in the request header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verifying the JWT token using a secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token has expired
    if (decoded.exp <= Date.now() / 1000) {
      return res.status(401).json({ error: "Token has expired" });
    }

    // Attaching the user ID from the decoded token to the request object
    req.userId = decoded.userId;
    // Passing control to the next middleware or route handler
    next();
  } catch (error) {
    // Handling errors related to token verification
    res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware function for validating request parameters using express-validator
export const validateRequest = (req, res, next) => {
  // Checking for validation errors in the request
  const errors = validationResult(req);

  // If validation errors are found, returning a 400 Bad Request response
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Passing control to the next middleware or route handler if no validation errors
  next();
};
