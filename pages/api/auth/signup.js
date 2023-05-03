import connectMongo from "../../../utils/connectMongo";
import User from "@/models/userModel";
const signup = async function (req, res) {
  try {
    await connectMongo();
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ error: "User already exists" });
    } else {
      const newUser = new User({ username, password });
      const user = await newUser.save();
      res.status(201).json({
        user,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
export default signup;
