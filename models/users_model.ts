import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }, 
  email: {
    type: String,
    required: true,
  },
  posts: {
    type: [String],
    default: []
  }
  
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;