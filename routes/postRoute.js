import express from "express";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { authenticate } from "../utils/middleware.js";

const router = express.Router();

router.get("/posts", getAllPosts);
router.post("/posts", authenticate, createPost);
router.put("/posts/:id", authenticate, updatePost);
router.delete("/posts/:id", authenticate, deletePost);

export default router;
