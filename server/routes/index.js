const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const pictureRouter = require("./pictureRouter");
const basketRouter = require("./basketRouter");

router.use("/user", userRouter);
router.use("/picture", pictureRouter);
router.use("/basket", basketRouter);

module.exports = router;
