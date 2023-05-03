import { Schema, model, models } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        author: {
          type: String,
          required: true,
          default: "Unknown",
        },
        country: {
          type: String,
          required: true,
        },
        imageLink: {
          type: String,
        },
        language: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
        pages: {
          type: Number,
        },
        title: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
        },
        reviews: {
          type: [Object],
          default: [],
        },
        new: {
          type: Boolean,
          // default: false,
        },
        currentPage: {
          type: Number,
          default: 0,
        },
      },
    ],
    default: [],
  },
});
const User = models.user || model("user", userSchema);

export default User;
