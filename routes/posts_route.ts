import express from "express";
const router = express.Router();
import postsController from "../controllers/posts_controller";

router.post("/", postsController.addNewPost);
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.put("/:id", postsController.updatePost);
router.get("/byOwner/:owner", postsController.getPostsByOwner);

export default router;