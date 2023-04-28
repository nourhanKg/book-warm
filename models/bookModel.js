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
});
const Book = models.Book || model("Book", bookSchema);

export default Book;
