const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/apiError");
const db = require("../db");
const { unlink } = require("node:fs/promises");

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

  async update(req, res, next) {
    try {
      const { title, price, category, description, id } = req.body;

      const newPicture = await db.query(
        "UPDATE picture SET title=$1, price=$2, description=$3, category=$4 WHERE id=$5 RETURNING *",
        [title, price, description, category, id]
      );

      return res.json(newPicture.rows[0]);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //-----------------------------------------------------------------------------------

  async getAll(req, res, next) {
    try {
      const pictures = await db.query("SELECT * FROM picture");

      return res.json(pictures.rows);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  //-----------------------------------------------------------------------------------

  async getOne(req, res) {
    const { id } = req.params;
    const picture = await db.query("SELECT * FROM picture WHERE id = $1", [id]);
    return res.json(picture.rows[0]);
  }

  //-----------------------------------------------------------------------------------

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const picture = await db.query("SELECT * FROM picture WHERE id = $1", [
        id,
      ]);

      await unlink(path.join(__dirname, "..", "static", picture.rows[0].img));

      await db.query("DELETE FROM picture WHERE id = $1", [id]);

      return res.json({
        message: "deleted successfully",
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PictureController();
