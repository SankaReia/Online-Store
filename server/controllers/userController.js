const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY /* {
    expiresIn: "24h",
  } */
  );
};

class UserController {
  async register(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Некоректный email или password"));
    }

    const candidate = await db.query("SELECT * FROM person WHERE email=$1", [
      email,
    ]);

    if (candidate.rows[0]) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await db.query(
      "INSERT INTO person (email, password) values ($1, $2) RETURNING *",
      [email, hashPassword]
    );

    const basket = await db.query(
      "INSERT INTO basket (person_id) values ($1) ",
      [user.rows[0].id]
    );

    const token = generateJwt(
      user.rows[0].id,
      user.rows[0].email,
      user.rows[0].role
    );
    return res.json({ token });
  }

  //-----------------------------------------------------------------------------------

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await db.query("SELECT * FROM person WHERE email=$1", [
        email,
      ]);

      if (!user.rows[0]) {
        return next(ApiError.internal("Пользователь не существует"));
      }

      let comparePassword = bcrypt.compareSync(password, user.rows[0].password);
      if (!comparePassword) {
        return next(ApiError.internal("Указан неверный пароль"));
      }

      const token = generateJwt(
        user.rows[0].id,
        user.rows[0].email,
        user.rows[0].role
      );
      return res.json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  //-----------------------------------------------------------------------------------

  async checkAuth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
