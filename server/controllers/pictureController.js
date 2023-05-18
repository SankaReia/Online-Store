const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/apiError");
const db = require("../db");

class PictureController {
  async create(req, res, next) {
    try {
      const { title, price, category, description } = req.body;
      const { img } = req.files;
      //Генерирует уникальный id файла:
      let fileName = uuid.v4() + ".jpg";
      //Перемещает данный файл в папку static:
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const picture = await db.query(
        "INSERT INTO picture (title, price, img, description, category) values ($1, $2, $3, $4, $5) RETURNING *",
        [title, price, fileName, description, category]
      );

      return res.json(picture.rows[0]);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //-----------------------------------------------------------------------------------

  async getAll(req, res) {
    //query - строка запроса
    const { category_id } = req.query;
    let pictures;
    if (!category_id) {
      pictures = await db.query("SELECT * FROM picture");
    } else {
      pictures = await db.query(
        "SELECT * FROM picture WHERE category_id = $1",
        [category_id]
      );
    }
    return res.json(pictures.rows);
  }

  //-----------------------------------------------------------------------------------

  async getOne(req, res) {
    const { id } = req.params;
    const picture = await db.query("SELECT * FROM picture WHERE id = $1", [id]);
    return res.json(picture.rows);
  }
}

module.exports = new PictureController();
