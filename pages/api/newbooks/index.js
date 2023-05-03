import connectMongo from "../../../utils/connectMongo";
import NewBook from "@/models/newBookModel";

export default async function getNewBooks(req, res) {
  try {
    await connectMongo();
    const books = await NewBook.find({});
    res.status(212).json({
      status: "success",
      results: books.length,
      data: {
        books: books,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
