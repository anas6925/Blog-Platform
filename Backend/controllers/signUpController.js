import jwt from "jsonwebtoken";
import User from "../models/signUpModel.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
        code: 400,
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "User Name already exists",
        code: 400,
      });
    }

    // Hash the password (trimmed)
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const payload = { user: { id: newUser.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User created successfully",
      code: 200,
      data: { token },
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Email",
        code: 400,
      });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Password",
        code: 400,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      message: "Login Successfully",
      code: 200,
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      code: 500,
      error: error.message,
    });
  }
};
