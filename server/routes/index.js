const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const pictureRouter = require("./pictureRouter");
const categoryRouter = require("./categoryRouter");

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/picture", pictureRouter);

module.exports = router;
