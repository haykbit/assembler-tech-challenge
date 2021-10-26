const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: [2, "First name needs to have at least 2 characters"],
      maxLength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: [50, "Last name cannot exceed 50 characters"],
    },
    userName: {
      type: String,
      trim: true,
      default: "",
      maxLength: [50, "User name cannot exceed 50 characters"],
    },
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate: {
        validator: (value) => isEmail[value],
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    firebase_id: {
      type: String,
      unique: true,
    },
    myMemes: {
      type: [{ type: Schema.Types.ObjectId, ref: "memes" }],
      default: [],
    },
    myFavoriteMemes: {
      type: [{ type: Schema.Types.ObjectId, ref: "song" }],
      default: [],
    },
    auth_admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
