const db = require("../models");

async function signIn(req, res, next) {
  const { uid, email } = req.user;
  try {
    const user = await db.User.findOne({ email: email });

    if (user) {
      return res.sendStatus(200);
    }

    const newUser = await db.User.create({
      firebase_id: uid,
      email: email,
      firstName: req.body.user ? req.body.user.firstName : "",
      lastName: req.body.user ? req.body.user.lastName : "",
      artist: req.body.user ? req.body.user.artist : "",
      userName: req.body.user ? req.body.user.userName : "",
      profileImage: undefined,
    });

    res.status(200).send({
      data: newUser,
    });
  } catch (err) {
    console.log(err);
  }
}

async function getUserById(req, res, next) {
  const { id: userId } = req.params;

  try {
    const user = await db.User.findOne({ firebase_id: userId }).lean();

    res.status(200).send({
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
}

async function getMyFavoriteSongs(req, res, next) {
  const { id: userId } = req.params;
  try {
    const user = await db.User.findOne({ firebase_id: userId });
    const myFavSongs = user.myFavoriteSongs;
    const songsData = await db.Song.find({
      _id: { $in: myFavSongs },
    });

    const orderedSongs = myFavSongs.map((songId) => {
      const orderedSong = songsData.filter(
        (song) => song._id.toString() === songId.toString()
      );
      return orderedSong[0];
    });

    res.status(200).send({
      data: orderedSongs,
    });
  } catch (error) {
    next(error);
  }
}

async function getMySongs(req, res, next) {
  const { id: userId } = req.params;
  try {
    const user = await db.User.findOne({ firebase_id: userId });
    const mySongs = user.mySongs;
    const mySongsData = await db.Song.find({
      _id: { $in: mySongs },
    });
    res.status(200).send({
      data: mySongsData,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signIn,
  getUserById,
  getMyFavoriteSongs,
  getMySongs,
};
