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
