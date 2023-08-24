const Movie = require("../models/MoviesModel");
const asyncHandler = require("express-async-handler");

exports.createMovie = asyncHandler(async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const savedMovie = await newMovie.save();
    res.status(200).json({
      success: true,
      message: "Successfully created movie",
      data: savedMovie,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
});

exports.updateMovie = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    const updateMovie = await Movie.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updateMovie) {
      const error = new Error("Movie not found !");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateMovie,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Movie.findById(id);

    if (result) {
      await Movie.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Successfully deleted",
      });
    } else {
      const error = new Error("Movie not found !");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

exports.getMovies = asyncHandler(async (req, res) => {
  try {
    // filter movies by category,time,language,rate,year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };
    // pagination
    const page = Number(req.query.pageNumber) || 1;
    const limit = 2;
    const skip = (page - 1) * limit;

    // find movies by query
    const movies = await Movie.find(query).skip(skip).limit(limit);

    // get total number of movies
    const count = await Movie.countDocuments(query);
    res.status(200).json({
      success: true,
      message: "Successfully fetch movies",
      page,
      pages: Math.ceil(count / limit),
      data: movies,
      totalMovies: count,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
});

exports.getMovieById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    // filter movie by id
    const movie = await Movie.findById(id);
    if (movie) {
      res.status(200).json({
        success: true,
        message: "Successfully fetch movie",
        data: movie,
      });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch. Try again ",
    });
  }
});

exports.getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    // find movies by query
    const movies = await Movie.find({}).sort({ rate: -1 });

    res.status(200).json({
      success: true,
      message: "Successfully fetch movies",
      data: movies,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch. Try again",
    });
  }
});

exports.getRandomMovies = asyncHandler(async (req, res) => {
  try {
    // find movies by query
    const movies = await Movie.aggregate([{ $sample: { size: 4 } }]);

    res.status(200).json({
      success: true,
      message: "Successfully fetch movies",
      data: movies,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch. Try again",
    });
  }
});

exports.createMovieReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      // check if the user already reviewed this movie
      const alreadyReviewed = movie.reviews.find(
        (review) => review.userId.toString() === req.user._id.toString()
      );

      // if the user already reviewed this movie send 400 error
      if (alreadyReviewed) {
        const error = new Error("You already reviewed this movie");
        error.statusCode = 400;
        throw error;
      }
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment: comment,
      };
      // push the new review to the reviews array
      movie.reviews.push(review);
      movie.numberOfReviews = movie.reviews.length;

      // calculate the new rate
      movie.rate = (
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.numberOfReviews
      ).toFixed(2);

      // save the movie in database
      await movie.save();
      // send the new review to the client
      res.status(201).json({
        success: true,
        message: "Review added",
      });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});
