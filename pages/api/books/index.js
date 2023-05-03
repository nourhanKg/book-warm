import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectMongo from "../../../utils/connectMongo";
import Book from "@/models/bookModel";
export default async function getAllBooks(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (true) {
      await connectMongo();
      const books = await Book.find(req.query);
      res.status(212).json({
        status: "success",
        results: books.length,
        data: {
          books: books,
        },
      });
    } else {
      throw new Error("You are not authenticated!");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
