import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

const commentModel = mongoose.model("Comments", commentSchema);

export default commentModel;