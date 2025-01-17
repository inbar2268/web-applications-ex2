import PostModel from "../models/posts_model";
import { Request, Response } from "express";


const addNewPost = async (req: Request, res: Response) => {
  const postBody = req.body;
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  }  catch (error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      res.status(400).send((error as { message: string }).message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
      const posts = await PostModel.find();
      res.send(posts); 
  }  catch (error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      res.status(400).send((error as { message: string }).message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};

const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  }  catch (error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      res.status(400).send((error as { message: string }).message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};

const getPostsByOwner = async (req: Request, res: Response) => {
  const owner = req.params.owner;

  try {
    const posts = await PostModel.find({owner:owner});
    if (posts.length>0) {
      res.status(200).send(posts);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      res.status(400).send((error as { message: string }).message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};

const updatePost = async (req: Request, res: Response)=> {
  const postId = req.params.id;
  const { title, content, owner } = req.body;

  try {
    const updatedPost = await PostModel.findById(postId.trim());

    if (updatedPost !== null) {
      updatedPost.title = title;
      updatedPost.content = content;
      updatedPost.owner = owner;
      await updatedPost.save();
      res.status(200).send(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      res.status(400).send((error as { message: string }).message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};



export default {
  addNewPost,
  getAllPosts,
  getPostById,
  updatePost,
  getPostsByOwner
};