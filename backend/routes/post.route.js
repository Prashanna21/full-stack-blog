import express from "express";
import {
  getPost,
  getPosts,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/upload-auth", uploadAuth);
router.get("/:slug", getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/:id", featurePost);

export default router;
