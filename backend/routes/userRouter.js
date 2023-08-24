const express = require("express");
const userController = require("../controller/userController");
const { protect, admin } = require("../middlewares/auth");

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// PRIVATE ROUTES
router.put("/profile", protect, userController.updateUserProfile);
router.delete("/profile", protect, userController.deleteUserProfile);
router.put("/password", protect, userController.changeUserPassword);
router.get("/favorites", protect, userController.getLikedMovies);
router.post("/favorites", protect, userController.addLikedMovies);
router.delete("/favorites", protect, userController.deleteLikedMovies);

// ADMIN ROUTES
router.get("/", protect, admin, userController.getUsers);
router.delete("/:id", protect, admin, userController.deleteUser);

module.exports = router;
