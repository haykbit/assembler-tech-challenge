const Router = require("express").Router;
const { authMiddleware } = require("../middleware");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.post("/login", authMiddleware, userController.signIn);
userRouter.get("/:id", authMiddleware, userController.getUserById);
userRouter.get("/myMemes/:id", authMiddleware, userController.getMySongs);
userRouter.get(
  "/myFavoriteMemes/:id",
  authMiddleware,
  userController.getMyFavoriteSongs
);

module.exports = {
  userRouter,
};
