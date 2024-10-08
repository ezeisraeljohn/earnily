const User = require("../models/index").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @type {import('express').RequestHandler}
 * @param {import('express').Request} req default request object
 * @param {import('express').Response} res default response object
 *
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role, // employer or jobseeker
    });

    await user.save();
    res.status(201).json(JSON.stringify(user));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
