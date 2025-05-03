import userModel from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await userModel.findOne({ clerkId: clerkUserId });
  return res.status(200).send(user?.savedPosts);
};

export const saveUserPost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;
  const user = await userModel.findOne({ clerkId: clerkUserId });
  const userSavedPosts = user?.savedPosts;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const isSaved = userSavedPosts?.includes(postId);

  if (isSaved) {
    await userModel.findByIdAndUpdate(user?._id, {
      $pull: { savedPosts: postId },
    });
  } else {
    await userModel.findByIdAndUpdate(user?._id, {
      $push: { savedPosts: postId },
    });
  }

  return res.status(200).send("Post Saved Sucessfully");
};
