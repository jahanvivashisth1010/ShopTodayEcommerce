// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const sendEmail = require("../utils/sendEmail");

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({ name, email, password: hashedPassword });
//     if (user) {
//       // Generate a mock OTP
//       const otp = Math.floor(100000 + Math.random() * 900000);

//       // Send Welcome / OTP Email
//       const message = `
//         <h2>Welcome to ShopToday, ${name}!</h2>
//         <p>Thank you for registering on our platform.</p>
//         <p>Your one-time verification/discount OTP is: <strong>${otp}</strong></p>
//       `;

//       await sendEmail({
//         email: user.email,
//         subject: "Welcome to ShopToday - Your OTP",
//         message,
//       });

//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(400).json({ message: "Invalid user data" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({}).select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { registerUser, loginUser, getUsers };
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOtp();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    if (user) {
      const message = `
        <h2>Welcome to ShopToday, ${name}!</h2>
        <p>Thank you for registering on our platform.</p>
        <p>Your one-time verification OTP is: <strong>${otp}</strong></p>
        <p>This code expires in 10 minutes.</p>
      `;

      await sendEmail({
        email: user.email,
        subject: "Welcome to ShopToday - Verify your email",
        message,
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👇 YE NAYA FUNCTION HAI - isi se verify hota hai
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    if (!user.otp || !user.otpExpires || user.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new one." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👇 agar OTP expire ho jaye to naya bhejne ke liye
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.verified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const message = `
      <h2>Hi ${user.name},</h2>
      <p>Your new verification OTP is: <strong>${otp}</strong></p>
      <p>This code expires in 10 minutes.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "ShopToday - New Verification OTP",
      message,
    });

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUsers, verifyEmail, resendOtp };
