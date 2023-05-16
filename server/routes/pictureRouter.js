const Router = require("express");
const router = new Router();
const pictureController = require("../controllers/pictureController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), pictureController.create);
router.get("/", pictureController.getAll);
router.get("/:id", pictureController.getOne);

module.exports = router;
