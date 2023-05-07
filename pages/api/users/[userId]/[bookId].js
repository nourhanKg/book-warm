import connectMongo from "../../../../utils/connectMongo";
import User from "@/models/userModel";
export default async function crudBook(req, res) {
  try {
    await connectMongo();
    const { userId, bookId } = req.query;
    const user = await User.findById(userId);
    if (req.method === "GET") {
      const isFavorite = user.favorites.some((book) => {
        return bookId == book._id;
      });
      res.status(200).json({
        status: "success",
        isFavorite,
      });
    }
    if (req.method === "PATCH") {
      user.favorites.forEach((book) => {
        if (book._id == bookId) {
          Object.assign(book, req.body);
        }
      });
      const updateUser = await User.findByIdAndUpdate(userId, user, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        user: updateUser,
      });
    }
    if (req.method === "DELETE") {
      const newList = user.favorites.filter((book) => book._id != bookId);
      user.favorites = newList;
      const updateUser = await User.findByIdAndUpdate(userId, user, {
        new: true,
        runValidators: true,
      });
      res.status(202).json({
        message: "success",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
