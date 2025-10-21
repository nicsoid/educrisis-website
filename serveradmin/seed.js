const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@educrisis.org",
      password: hashedPassword,
      roles: ["admin"],
    });

    console.log("Admin user created:", admin.email);
    console.log("Password: admin123");
    console.log("Please change this password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
