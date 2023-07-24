const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");

router.post("/", basketController.add);
router.delete("/delete/:id", basketController.deleteOne);
router.put("/update", basketController.update);
router.get("/:id", basketController.getAll);

module.exports = router;
