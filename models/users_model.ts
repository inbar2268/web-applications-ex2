import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  posts: string[];
  password: string;
  _id?: string;
  refreshToken?: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  }, 
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: {
    type: [String],
    default: []
  }, 
  refreshToken: {
    type: [String],
    default: [],
  }
  
});

const userModel = mongoose.model<IUser>("Users", userSchema);

export default userModel;