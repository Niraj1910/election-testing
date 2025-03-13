var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { isAdmin } = require("../middleware/admin");

router.post("/register", async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    req.session.user = user;
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
});

router.post("/create-account", async (req, res) => {
  try {
    const { email, password, role, allowedConstituencies } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = {
      email,
      password: hashedPassword,
      role,
    };
    if (role === "user") {
      newUser["allowedConstituencies"] = allowedConstituencies;
    }
    const newCreatedUser = new User(newUser);
    const isSaved = await newCreatedUser.save();
    if (!isSaved) {
      return res.status(400).json({ message: "Bad Request" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "You are not registered!" });
    }
    if (await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/admin", isAdmin, (req, res) => {
  res.status(200).json({ message: "Access granted to admin" });
});

module.exports = router;
