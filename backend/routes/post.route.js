import express from "express";
import {
  getPost,
  getPosts,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js";
import increaseVisits from "../middlewares/increaseVisits.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/upload-auth", uploadAuth);
router.get("/:slug", increaseVisits, getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/:id", featurePost);

export default router;
