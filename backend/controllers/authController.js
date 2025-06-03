import User from "../models/user.js";
import { generateHash, compareHash } from "../utils/hashUtils.js";
import { generateToken } from "../helper/jwtHelper.js";

// Register user route
export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: true, message: "User already exists with this e-mail" });
    }

    const hashedPassword = await generateHash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    // console.log("User details", newUser);
    const token = generateToken({ userId: newUser._id });
    res.status(201).json({ error: false, user: newUser.name, apiToken: token, message: "User registered" });
  } catch (error) {
    // console.error("Error register", error);
    res.status(500).json({ error: true, message: "Error registering" });
  }
};

// Login user route
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: true, message: "User not-found" });
    }

    const validPassword = await compareHash(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: true, message: "Invalid credentials" });
    }

    const token = generateToken({ userId: user._id });
    // console.log("Token", token);
    res.status(200).json({ error: false, user: user.name, apiToken: token, message: "User logged-in" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Error logging in" });
  }
};
