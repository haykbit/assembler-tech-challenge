const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MemeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title Meme"],
      trim: true,
      minLength: [2, "Meme title needs to have at least 2 characters"],
      maxLength: [80, "Meme title cannot exceed 80 characters"],
    },
    url: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Meme = mongoose.model("Meme", MemeSchema);
module.exports = {
  Meme,
};
