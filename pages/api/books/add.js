import connectMongo from "../../../utils/connectMongo";
import Book from "@/models/bookModel";
export default async function addNew(req, res) {
  try {
    await connectMongo();
    console.log("adding book");
    console.log(req.body);
    const book = await Book.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        book: book,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
