import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({ username, password: hashedPassword });

    // Save the user to the database
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error: User Already Registered" });
  }
};

export const login = async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find the user in the database by their username
    const user = await User.findOne({ username });

    // Check if the user exists or if the password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Return a 401 status and an error message for invalid credentials
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If the username and password are correct, generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    // Return the token in the response
    res.json({ token });
  } catch (error) {
    // Handle any internal server error by returning a 500 status
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
