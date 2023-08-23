const express = require("express");
const userController = require("../controller/userController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

// post
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// PRIVATE ROUTES
router.put("/profile", protect, userController.updateUserProfile);
router.delete("/profile", protect, userController.deleteUserProfile);
router.put("/password", protect, userController.changeUserPassword);
router.get("/favorites", protect, userController.getLikedMovies);

module.exports = router;
