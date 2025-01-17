
import CommentsModel from "../models/comments_model";
import { Request, Response } from "express";


const addNewComment = async (req: Request, res: Response) => {
  const commentBody = req.body;
  try {
    const comment = await CommentsModel.create(commentBody);
    res.status(201).send(comment);
  }  catch (error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      res.status(400).send((error as { message: string }).message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};
const updateComment = async (req: Request, res: Response) => {

    const commentId = req.params.id;
    const { message, owner, postId} = req.body;
  
    const updatedComment = await CommentsModel.findById(commentId.trim());
  
    if (updatedComment !== null) {
      updatedComment.message = message;
      updatedComment.owner = owner;
      updatedComment.postId = postId;
      try{
        updatedComment.save();
        res.status(201).send(updatedComment);
        }  catch (error: unknown) {
          if (error && typeof error === 'object' && 'message' in error) {
            res.status(400).send((error as { message: string }).message);
          } else {
            res.status(400).send('An unknown error occurred');
          }
        }
      } else{
        res.status(404).json({ message: 'Comment not found' });
      }
  };  
  const getCommentByID = async (req: Request, res: Response) => {
    const commentId = req.params.id;
  
    try {
      const comment = await CommentsModel.findById(commentId);
      if (comment) {
        res.send(comment);
      } else {
        res.status(404).send("comment not found");
      }
    }  catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        res.status(400).send((error as { message: string }).message);
      } else {
        res.status(400).send('An unknown error occurred');
      }
    }
  };

  const deleteComment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
  
    try {
      const result = await CommentsModel.findByIdAndDelete(commentId.trim());
      if (!result) {
        res.status(404).send('comment not found');
      }else{
        res.status(200).send('comment deleted successfully');
      }
    }  catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        res.status(500).send((error as { message: string }).message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  };

  const getCommentsByPostID = async (req: Request, res: Response) => {
    const postId= req.params.id;
  
    try {
      const comments = await CommentsModel.find({ postId: postId });
  
      if (comments.length > 0) {
        res.status(200).send(comments);
      } else {
        res.status(404).send("No comments found to the post");
      }
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'message' in error) {
          res.status(500).send((error as { message: string }).message);
        } else {
          res.status(500).send('An unknown error occurred');
        }
      }
  };
  

  export default {
    addNewComment,
    updateComment,
    getCommentByID,
    deleteComment,
    getCommentsByPostID
  };
  