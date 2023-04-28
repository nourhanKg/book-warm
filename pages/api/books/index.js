import { getSession } from "next-auth/react";
import connectMongo from "../../../utils/connectMongo";
import Book from "@/models/bookModel";
export default async function getAllBooks(req, res) {
  try {
    const session = await getSession({ req });
    console.log(session);
    if (true) {
      await connectMongo();
      console.log("getting all books");
      const books = await Book.find({});
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
