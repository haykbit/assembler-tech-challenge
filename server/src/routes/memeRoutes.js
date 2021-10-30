const Router = require("express").Router;
const { authMiddleware } = require("../middleware");
const { memeController } = require("../controllers");

const memeRouter = Router();

memeRouter.get("/all", authMiddleware, memeController.fetchMemes);
memeRouter.post("/", authMiddleware, memeController.createMeme);

module.exports = {
  memeRouter,
};
