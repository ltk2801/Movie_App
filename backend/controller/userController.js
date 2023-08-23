const User = require("../models/UserModels.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { generateToken } = require("../middlewares/auth");

exports.registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;

  try {
    const userExists = await User.findOne({ email });
    // check if user exists
    {
      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    // create user
    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
      image: image,
    });
    await newUser.save();
    // if user created successfully send user data and token to client
    if (newUser) {
      res.status(201).json({
        success: true,
        message: "Successfully created",
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          image: newUser.image,
          isAdminL: newUser.isAdmin,
          token: generateToken(newUser._id),
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // find user in DB
    const user = await User.findOne({ email });
    // if user exists compare password
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        success: true,
        message: "Successfully login",
        data: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          image: user.image,
          isAdminL: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    }
    // if user not found our password not match send error message
    else {
      res.status(401);
      throw new Error("Invalid email or password ");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, image } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists and update user data and save it in DB
    if (user) {
      // if email exists and send error
      const haveEmail = await User.findOne({ email });
      if (haveEmail) {
        res.status(400);
        throw new Error("Email already exists");
      }
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;

      const updatedUser = await user.save();
      // send updated user data and token to client
      res.status(200).json({
        success: true,
        message: "Successfully updated profile user",
        data: {
          _id: updatedUser._id,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          image: updatedUser.image,
          isAdminL: updatedUser.isAdmin,
          token: generateToken(updatedUser._id),
        },
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
exports.deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists and delete user
    if (user) {
      // if user is admin throw error message
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      //   else delete user from DB
      await User.findByIdAndRemove(user._id);
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
exports.changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists compare old password with hashed password then update user password and save it in DB
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      // hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password changed ! ",
      });
    }
    // if user not found our password not match send error message
    else {
      res.status(401);
      throw new Error("Invalid old password ");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
exports.getLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id).populate("likedMovies");
    // if user exists send liked movies to client
    if (user) {
      res.status(200).json({
        success: true,
        message: "Fetch likedMovies user successfully",
        data: user.likedMovies,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
exports.addLikedMovies = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists add movie to liked movies and save it in DB
    if (user) {
      // check if movie already liked
      // if movie already liked send error message
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie already liked");
      }
      // else add movie to liked movies and save it in DB
      user.likedMovies.push(movieId);
      await user.save();
      res.status(200).json({
        success: true,
        message: "Add likedMovie user successfully",
        data: user.likedMovies,
      });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
exports.deleteLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists delete all  liked movies and save it in DB
    if (user) {
      user.likedMovies = [];
      await user.save();
      res
        .status(201)
        .json({ message: "All liked movies deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ******************* ADMIN CONTROLLERS ******************
exports.getUsers = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const users = await User.find({});
    // if user exists send liked movies to client
    if (users) {
      res.status(200).json({
        success: true,
        message: "Fetch users successfully",
        data: users,
      });
    } else {
      res.status(404);
      throw new Error("Not found any user");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    // find user in DB
    const user = await User.findById(id);
    // if user exists send liked movies to client
    if (user) {
      // if user is admin throw error message
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      //   else delete user from DB
      await User.findByIdAndRemove(id);
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

exports.deleteUsers = asyncHandler(async (req, res) => {});
