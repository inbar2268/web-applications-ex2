import express from "express";
const router = express.Router();
import CommentsController from "../controllers/comments_controller";

router.post("/", CommentsController.addNewComment);
router.put("/:id", CommentsController.updateComment);
router.get("/:id", CommentsController.getCommentByID);
router.delete("/:id", CommentsController.deleteComment);
router.get("/byPost/:id", CommentsController.getCommentsByPostID)

export default router;