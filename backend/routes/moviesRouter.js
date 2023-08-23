const express = require("express");
const moviesController = require("../controller/moviesController");
const { protect, admin } = require("../middlewares/auth");

const router = express.Router();

// PUBLIC ROUTES
router.get("/", moviesController.getMovies);

// ADMIN ROUTES
router.post("/", protect, admin, moviesController.createMovie);

module.exports = router;
