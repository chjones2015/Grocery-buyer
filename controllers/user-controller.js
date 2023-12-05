const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");

const signup = async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName)) {
      res.status(400).send({ error: "All input is required" });
    }

    // Check if user already exist
    const existingUser = await User.findOne({ email });

    // If user exist return error
    if (existingUser) {
      return res
        .status(400)
        .send({ error: "User already exists. Please Login" });
    }

    // Encrypt user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Create token using user id, email and secret
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // return the token and user
    return res.status(201).json({
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      token,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send({ error: "All input is required" });
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    // If user exists and password is correct return token
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
        message: "Login successful",
      });
    }

    // If user does not exist or password is incorrect return error
    return res.status(400).send({ error: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    // find user in our database using id from token payload and miunus password
    const user = await User.findById(req.user.id).select("-password");

    // if user does not exist return error
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    // return user
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    // find user in our database using id from token payload and miunus password
    const user = await User.findById(req.user.id).select("-password");

    // if user does not exist return error
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    //check if the user is trying to update the password
    if (req.body.password) {
      // if the user is trying to update the password, encrypt the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // update the password
      req.body.password = hashedPassword;
    }

    // update user
    await User.findByIdAndUpdate(req.user.id, req.body);

    // find updated user
    const updatedUser = await User.findById(req.user.id).select("-password");

    // return updated user
    return res.status(200).json({
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export all the functions
module.exports = {
  signup,
  login,
  getUser,
  updateUser,
};
