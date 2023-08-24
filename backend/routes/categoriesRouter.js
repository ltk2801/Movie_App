const express = require("express");
const categoriesController = require("../controller/categoriesController");
const { protect, admin } = require("../middlewares/auth");

const router = express.Router();

// PUBLIC ROUTES
router.get("/", categoriesController.getCategories);

// ADMIN ROUTES
router.post("/", protect, admin, categoriesController.createCategory);
router.put("/:id", protect, admin, categoriesController.updateCategory);
router.delete("/:id", protect, admin, categoriesController.deleteCategory);

module.exports = router;
