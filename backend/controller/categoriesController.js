const Categories = require("../models/CategoriesModel");
const asyncHandler = require("express-async-handler");

exports.getCategories = asyncHandler(async (req, res, next) => {
  try {
    const categories = await Categories.find({});

    res.status(200).json({
      success: true,
      message: "Successfully fetch categories",
      data: categories,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

exports.createCategory = asyncHandler(async (req, res, next) => {
  try {
    const newCategory = new Categories(req.body);
    // if category exists and send error
    const haveCategory = await Categories.find({
      title: { $regex: new RegExp("^" + req.body.title + "$", "i") },
    });
    if (haveCategory.length > 0) {
      res.status(400);
      throw new Error("Thể loại phim đã có");
    }
    const savedCategory = await newCategory.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedCategory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    // if email exists and send error
    const haveCategory = await Categories.find({
      title: { $regex: new RegExp("^" + req.body.title + "$", "i") },
      _id: { $ne: id },
    });
    if (haveCategory.length > 0) {
      res.status(400);
      throw new Error("Tên thể loại đã có");
    }
    const updateCategory = await Categories.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateCategory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    await Categories.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
});
