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
  const { userId } = req.body;
  try {
    const userMemes = await db.Meme.find({ owner: userId });

    const memes = memes.concat(userMemes);

    res.status(200).send({
      data: memes,
    });
  } catch (err) {
    console.log(err);
  }
}

async function getMemeById(req, res, next) {
  const { id } = req.params;
  try {
    const meme = await db.Meme.findOne({ _id: id }).lean();

    res.status(200).send({
      data: meme,
    });
  } catch (err) {
    console.log(err);
  }
}

async function deleteMeme(req, res, next) {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    await db.Meme.deleteOne({ _id: id });
    await db.User.findOneAndUpdate(
      { firebase_id: userId },
      {
        $pull: { myMemes: id },
      },
      { new: true }
    );
    res.status(200).send({
      message: "OK",
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createMeme,
  fetchMemes,
  getMemeById,
  deleteMeme,
};
