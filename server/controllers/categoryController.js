const ApiError = require("../error/apiError");
const db = require("../db");

class CategoryController {
  async create(req, res) {
    const { title } = req.body;
    const category = await db.query(
      `INSERT INTO category (title) values ($1) RETURNING *`,
      [title]
    );
    return res.json(category.rows[0]);
  }

  //-----------------------------------------------------------------------------------

  async getAll(req, res) {
    const categories = await db.query("SELECT * FROM category");
    res.json(categories.rows);
  }
}

module.exports = new CategoryController();
