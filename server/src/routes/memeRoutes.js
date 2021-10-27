const Router = require("express").Router;
const { authMiddleware } = require("../middleware");
const { memeController } = require("../controllers");

const memeRouter = Router();

memeRouter.get("/all", authMiddleware, memeController.fetchMemes);
memeRouter.post("/", authMiddleware, memeController.createMeme);
memeRouter.get("/:id", authMiddleware, memeController.getMemeById);
memeRouter.delete("/:id", authMiddleware, memeController.deleteMeme);
memeRouter.put("/:id", authMiddleware, memeController.deleteMeme);

module.exports = {
  memeRouter,
};
