const db = require("../models");

async function createMeme(req, res, next) {
  const { meme } = req.body;
  const { title } = req.body;
  const { image } = req.body;
  const { uid } = req.user;
  console.log(req.body);
  try {
    const newMeme = await db.Meme.create({
      title,
      url: meme,
      owner: uid,
    });
    await db.User.findOneAndUpdate(
      { firebase_id: uid },
      {
        $push: { myMemes: [{ _id: newMeme._id }] },
      }
    );
    res.status(200).send({
      data: newMeme,
    });
  } catch (error) {
    next(error);
  }
}

async function fetchMemes(req, res, next) {
  try {
    const userMemes = await db.Meme.find();

    res.status(200).send({
      data: userMemes,
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createMeme,
  fetchMemes,
};
