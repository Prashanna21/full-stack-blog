import { query } from "express";
import postsModel from "../models/posts.model.js";
import userModel from "../models/user.model.js";
import ImageKit from "imagekit";

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const posts = await postsModel
    .find()
    .populate("user", "username")
    .limit(limit)
    .skip((page - 1) * limit);
  const totalPosts = await postsModel.countDocuments();
  const hasMore = page * limit < totalPosts;
  console.log("HASMORE", hasMore);
  console.log(page);
  res.status(200).send({ posts, hasMore });
};

export const getPost = async (req, res) => {
  const post = await postsModel
    .findOne({ slug: req.params.slug })
    .populate("user", "username image");
  res.status(200).send(post);
};

export const createPost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await userModel.findOne({ clerkId: clerkUserId });

  if (!user) {
    return res.status(404).json("User not found");
  }

  //Slug Creatiion

  let slug = req.body.title.replace(/ /g, "-");

  let postWithTitle = await postsModel.findOne({ slug: slug });
  let counter = 2;

  while (postWithTitle) {
    slug += `-${counter}`;
    postWithTitle = await postsModel.findOne({ slug: slug });
    counter++;
  }

  const newPost = new postsModel({ user: user, slug, ...req.body }); //here i have passed whole user instead of userId

  const post = await newPost.save();

  res.status(200).send(post);
};

export const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await userModel.findOne({ clerkId: clerkUserId });
  console.log(user);

  const post = await postsModel.findByIdAndDelete({
    _id: req.params.id,
    user: user._id,
  });
  if (!deletePost) {
    return res.status(403).json("you can only delete your post");
  }
  res.status(200).send("Post has been deleted");
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadAuth = (req, res) => {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
};
