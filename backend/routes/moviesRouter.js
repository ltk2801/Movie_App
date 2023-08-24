const express = require("express");
const moviesController = require("../controller/moviesController");
const { protect, admin } = require("../middlewares/auth");

const router = express.Router();

// PUBLIC ROUTES
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.get("/rated/top", moviesController.getTopRatedMovies);
router.get("/random/all", moviesController.getRandomMovies);

// PRIVATE ROUTES
router.post("/:id/reviews", protect, moviesController.createMovieReview);

// ADMIN ROUTES
router.post("/", protect, admin, moviesController.createMovie);
router.put("/:id", protect, admin, moviesController.updateMovie);
router.delete("/:id", protect, admin, moviesController.deleteMovie);

module.exports = router;
