const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectDB, sql } = require("../db");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const pool = await connectDB();

    // Check existing user
    const existingUser = await pool.request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE Email = @email");

    if (existingUser.recordset.length > 0) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await pool.request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword)
      .query(`
        INSERT INTO Users (Name, Email, PasswordHash)
        VALUES (@name, @email, @password)
      `);

    return res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await connectDB();

    const result = await pool.request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE Email = @email");

    if (result.recordset.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user.Id,
        email: user.Email,
        role: user.Role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.Id,
        name: user.Name,
        email: user.Email,
        role: user.Role
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};