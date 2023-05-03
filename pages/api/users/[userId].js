import connectMongo from "../../../utils/connectMongo";
import User from "@/models/bookModel";
export default async function getUesrList(req, res) {
  try {
    await connectMongo();
    const { userId } = req.query;
    console.log(userId);
    console.log(req.body);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
