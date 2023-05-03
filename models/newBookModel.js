import { Schema, model, models } from "mongoose";
const newBookSchema = new Schema({
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
});
const NewBook = models.newbooks || model("newbooks", newBookSchema);

export default NewBook;
