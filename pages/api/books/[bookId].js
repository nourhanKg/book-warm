import connectMongo from "../../../utils/connectMongo";
import Book from "@/models/bookModel";
export default async function addNew(req, res) {
  try {
    await connectMongo();
    const { bookId } = req.query;
    if (req.method === "PATCH") {
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
      await Book.findByIdAndDelete(bookId);
      res.status(200).json({
        status: "success",
      });
    } else if (req.method === "GET") {
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
