import UserModel from "../models/users_model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

const addNewUser = async (req: Request, res: Response) => {
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await UserModel.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
  });
    res.status(201).send(user);
  }  catch (error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      res.status(400).send((error as { message: string }).message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};

const updateUser = async (req: Request, res: Response) => {

    const userId = req.params.id;
    const { username, email, password ,posts} = req.body;
  
    const updatedUser = await UserModel.findById(userId.trim());
  
    if (updatedUser !== null) {
      updatedUser.username = username;
      updatedUser.email = email;
      updatedUser.password = password;
      updatedUser.posts = posts;

      try{
        await updatedUser.save();
        res.status(201).send(updatedUser);
        }  catch (error: unknown) {
          if (error && typeof error === 'object' && 'message' in error) {
            res.status(400).send((error as { message: string }).message);
          } else {
            res.status(400).send('An unknown error occurred');
          }
        }
      } else{
        res.status(404).json({ message: 'User not found' });
      }
  };  

  const getUserByID = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const user = await UserModel.findById(userId);
      
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    }  catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        res.status(400).send((error as { message: string }).message);
      } else {
        res.status(400).send('An unknown error occurred');
      }
    }
  };

  const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
  
    try {
      const result = await UserModel.findByIdAndDelete(userId.trim());
      if (!result) {
        res.status(404).send('user not found');
      }else{
        res.status(200).send('user deleted successfully');
      }
    }  catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        res.status(500).send((error as { message: string }).message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  };
  

  export default {
    addNewUser,
    updateUser,
    getUserByID,
    deleteUser,
  };
  