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

    // Tạo một đối tượng để ánh xạ các khoảng thời gian tương ứng
    const timeRanges = {
      "030": { min: 0, max: 30 },
      3060: { min: 30, max: 60 },
      6090: { min: 60, max: 90 },
      90120: { min: 90, max: 120 },
      120150: { min: 120, max: 150 },
      150180: { min: 150, max: 180 },
      180210: { min: 180, max: 210 },
      210240: { min: 210, max: 240 },
      240270: { min: 240, max: 270 },
    };
    // Tạo một đối tượng để ánh xạ các khoảng đánh giá tương ứng
    const rateRanges = {
      0: { min: 0, max: 1 },
      1: { min: 1, max: 2 },
      2: { min: 2, max: 3 },
      3: { min: 3, max: 4 },
      4: { min: 4, max: 5 },
      5: { min: 5, max: 6 },
    };

    let query = {
      ...(category && { category }),
      ...(time && {
        time: { $gte: timeRanges[time].min, $lt: timeRanges[time].max },
      }),
      ...(language && { language }),
      ...(rate && {
        rate: { $gte: rateRanges[rate].min, $lt: rateRanges[rate].max },
      }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };
    // pagination
    const page = Number(req.query.pageNumber) || 1;
    const limit = Number(req.query.limit) || 4;
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
      message: "Đã có lỗi xảy ra !",
    });
  }
});

exports.getMovieById = asyncHandler(async (req, res, next) => {
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
      throw new Error("Không tìm thấy bộ phim ! Vui lòng thử lại");
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
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
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);

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
        const error = new Error("Bạn đã đánh giá bộ phim này rồi !");
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
