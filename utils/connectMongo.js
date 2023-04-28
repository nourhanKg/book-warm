import mongoose from "mongoose";

const connectMongo = async () =>
  mongoose.connect(
    "mongodb+srv://nnorhan283:123456Nn@natrous.usixkar.mongodb.net/bookWarm?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
export default connectMongo;
