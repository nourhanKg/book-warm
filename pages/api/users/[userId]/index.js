import connectMongo from "../../../../utils/connectMongo";
import User from "@/models/userModel";
export default async function getUesrList(req, res) {
  try {
    await connectMongo();
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (req.method === "GET") {
      res.status(200).json({
        list: user.favorites,
      });
    }
    if (req.method === "POST") {
      user.favorites.push({
        ...req.body,
        currentPage: 0,
      });
      const updateUser = await User.findByIdAndUpdate(userId, user, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        user: updateUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
