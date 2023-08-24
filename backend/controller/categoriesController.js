const Categories = require("../models/CategoriesModel");
const asyncHandler = require("express-async-handler");

exports.getCategories = asyncHandler(async (req, res, next) => {
  try {
    const categories = await Categories.find({});

    if (categories.length === 0) {
      const error = new Error("No data in categories");
      error.statusCode = 400;
      throw error;
    }
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

exports.updateCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
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
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
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
