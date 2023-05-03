import { Schema, model, models } from "mongoose";
const bookSchema = new Schema({
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
});
const MyBook = models.allbooks || model("allbooks", bookSchema);

export default MyBook;
