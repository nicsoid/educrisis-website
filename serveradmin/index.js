const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const User = require("./models/User");
const Page = require("./models/Page");
const Donation = require("./models/Donation");
const Newsletter = require("./models/Newsletter");

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Routes
// Auth routes
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin stats
app.get("/api/admin/stats", authenticate, async (req, res) => {
  try {
    const totalDonations = await Donation.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalDonors = await Donation.distinct("email").length;
    const newsletterSubscribers = await Newsletter.countDocuments({
      active: true,
    });
    const recentDonations = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.json({
      totalDonations: totalDonations[0]?.total || 0,
      totalDonors,
      newsletterSubscribers,
      pageViews: 45231, // Would come from analytics
      recentDonations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Content management
app.get("/api/admin/content/:pageId", authenticate, async (req, res) => {
  try {
    const page = await Page.findById(req.params.pageId);
    res.json(page.content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/admin/content/:pageId", authenticate, async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.pageId,
      { content: req.body, updatedBy: req.user._id },
      { new: true }
    );
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
