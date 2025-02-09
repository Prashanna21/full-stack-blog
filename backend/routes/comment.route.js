import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controller.js";

const router = express.Router();
router.post("/:id", createComment);
router.get("/:id", getComments);
router.delete("/:id", deleteComment);

export default router;
