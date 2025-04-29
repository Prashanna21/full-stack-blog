import express from "express";
import {
  getUserSavedPosts,
  saveUserPost,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/savedposts", getUserSavedPosts);
router.patch("/savepost", saveUserPost);

export default router;
