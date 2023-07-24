const ApiError = require("../error/apiError");
const db = require("../db");

class PictureController {
  async add(req, res, next) {
    try {
      const { person_id, picture_id, quantity } = req.body;

      const picture = await db.query(
        "INSERT INTO basket (person_id, picture_id, quantity) values ($1, $2, $3) RETURNING *",
        [person_id, picture_id, quantity]
      );

      return res.json(picture.rows[0]);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //-----------------------------------------------------------------------------------

  async getAll(req, res, next) {
    try {
      const { id } = req.params;

      const basket = await db.query(
        "SELECT * FROM basket WHERE person_id = $1",
        [id]
      );
      return res.json(basket.rows);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  //-----------------------------------------------------------------------------------

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      await db.query("DELETE FROM basket WHERE picture_id = $1", [id]);

      return res.json({
        message: "deleted successfully",
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //-----------------------------------------------------------------------------------

  async update(req, res, next) {
    try {
      const { person_id, picture_id, quantity } = req.body;

      const newBasket = await db.query(
        "UPDATE basket SET quantity=$1 WHERE person_id=$2 AND picture_id=$3 RETURNING *",
        [quantity, person_id, picture_id]
      );
      return res.json(newBasket.rows[0]);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PictureController();
