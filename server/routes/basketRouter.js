const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");

router.post("/", basketController.add);
router.delete("/:id", basketController.deleteOne);
router.get("/:id", basketController.getAll);

module.exports = router;
