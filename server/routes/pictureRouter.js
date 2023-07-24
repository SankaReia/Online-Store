const Router = require("express");
const router = new Router();
const pictureController = require("../controllers/pictureController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), pictureController.create);
router.put("/update", checkRole("ADMIN"), pictureController.update);
router.delete("/delete/:id", checkRole("ADMIN"), pictureController.deleteOne);
router.get("/", pictureController.getAll);
router.get("/:id", pictureController.getOne);

module.exports = router;
