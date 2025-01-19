import express from "express";
const router = express.Router();
import CommentsController from "../controllers/comments_controller";
import { authMiddleware } from "../controllers/auth_controller";

router.post("/", authMiddleware, CommentsController.addNewComment);
router.put("/:id", authMiddleware, CommentsController.updateComment);
router.get("/:id", authMiddleware, CommentsController.getCommentByID);
router.delete("/:id", authMiddleware, CommentsController.deleteComment);
router.get("/byPost/:id", authMiddleware, CommentsController.getCommentsByPostID)

export default router;