import express from "express";
const router = express.Router();
import postsController from "../controllers/posts_controller";
import { authMiddleware } from "../controllers/auth_controller";

router.post("/", authMiddleware, postsController.addNewPost);
router.get("/", authMiddleware, postsController.getAllPosts);
router.get("/:id", authMiddleware, postsController.getPostById);
router.put("/:id", authMiddleware, postsController.updatePost);
router.get("/byOwner/:owner", authMiddleware, postsController.getPostsByOwner);

export default router;