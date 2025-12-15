import { Category } from "../models/cat.model.js";
import { CreateModel } from "../utils/api.model.js";

/**
 * STORE CATEGORY
 */
export async function store(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({
        success: false,
        message: "Category name is required",
      });
    }

    const result = await CreateModel(Category, { name }, "Category Added!");
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * GET ALL CATEGORIES
 */
export async function index(req, res) {
  try {
    const records = await Category.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * DELETE CATEGORY
 */
export async function trash(req, res) {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Category Deleted!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * UPDATE CATEGORY
 */
export async function update(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Category.findByIdAndUpdate(id, { name });

    res.json({
      success: true,
      message: "Category Updated!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
