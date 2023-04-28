import connectMongo from "../../../utils/connectMongo";
import Book from "@/models/bookModel";
export default async function addNew(req, res) {
  try {
    await connectMongo();
    const { bookId } = req.query;
    console.log(req.method);
    console.log(req.method === "PATCH");
    if (req.method === "PATCH") {
      console.log("updating book");
      console.log(req.body);
      console.log(bookId);
      const book = await Book.findByIdAndUpdate(bookId, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(201).json({
        status: "success",
        data: {
          book: book,
        },
      });
    } else if (req.method === "DELETE") {
      console.log("deleting book");
      await Book.findByIdAndDelete(bookId);
      res.status(200).json({
        status: "success",
      });
    } else if (req.method === "GET") {
      console.log("getting single book");
      const book = await Book.findById(bookId);
      res.status(200).json({
        status: "success",
        data: {
          book,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
