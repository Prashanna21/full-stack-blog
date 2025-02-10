import commentsModel from "../models/comments.model.js";
import postsModel from "../models/posts.model.js";
import userModel from "../models/user.model.js";

export const createComment = async (req, res) => {
  const postId = req.params.id;
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await userModel.findOne({ clerkId: clerkUserId });
  const newComment = new commentsModel({ user, post: postId, ...req.body });
  newComment.save();
  res.status(200).send(newComment);
};

export const getComments = async (req, res) => {
  const postId = req.params.id;
  const comments = await commentsModel
    .find({ post: postId })
    .populate("user", "username image clerkId")
    .sort({ createdAt: -1 });
  console.log(comments);
  res.status(200).send(comments);
};

export const deleteComment = async (req, res) => {
  console.log(req);
  const commentId = req.params.id;
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }
  const user = await userModel.findOne({ clerkId: clerkUserId });

  const deletedComment = await commentsModel.findByIdAndDelete({
    _id: commentId,
    user: user._id,
  });
  console.log(deleteComment);
  if (!deleteComment) {
    return res.status(500).json("Comment failed ");
  }
  return res.status(200).json("Sucessful deletion");
};
