import { query } from "express";
import postsModel from "../models/posts.model.js";
import userModel from "../models/user.model.js";
import ImageKit from "imagekit";

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  let query = {};
  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  if (cat) {
    query.category = cat;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i" }; //search for that perticular word for search 'i' means case insesistive
  }

  if (author) {
    const user = await userModel.findOne({ username: author }).select("_id"); //select gives particualry id only in object like {_id : dasljfkla}

    if (!user) {
      return res.status(404).send("No Post Found");
    }

    query.user = user._id;
  }

  if (featured) {
    query.isFeatured = true;
  }

  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "popular":
        sortObj = { visit: -1 };
        break;
      case "trending":
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // to get the trending post in 7 days
        };
        break;
    }
  }

  console.log(query);

  const posts = await postsModel
    .find(query)
    .populate("user", "username")
    .limit(limit)
    .sort(sortObj)
    .skip((page - 1) * limit);
  const totalPosts = await postsModel.countDocuments();
  const hasMore = page * limit < totalPosts;

  if (posts.length === 0) {
    return res.status(404).send("No post found");
  }

  res.status(200).send({ posts, hasMore });
};

export const getPost = async (req, res) => {
  const post = await postsModel
    .findOne({ slug: req.params.slug })
    .populate("user", "username image clerkId");
  res.status(200).send(post);
  console.log(post.visits);
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
  const role = req.auth?.sessionClaims?.metadata?.role;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await userModel.findOne({ clerkId: clerkUserId });

  if (role === "admin") {
    await postsModel.findByIdAndDelete(req.params.id);
    return res.status(200).send("Post has been deleted");
  }

  const deletePost = await postsModel.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletePost) {
    return res.status(403).json("you can only delete your post");
  }
  console.log("Your post is deleted");
  return res.status(200).send("Post has been deleted");
};

export const featurePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  console.log(req);
  const role = req.auth.sessionClaims?.metadata?.role;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await userModel.findOne({ clerkId: clerkUserId });

  const post = await postsModel.findById(req.params.id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  const isFeatured = post.isFeatured;

  if (role === "admin") {
    const updatedPost = await postsModel.findByIdAndUpdate(req.params.id, {
      isFeatured: !isFeatured,
    });
    return res.status(200).send("Post has been deleted");
  }

  const deletePost = await postsModel.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletePost) {
    return res.status(403).json("you can only delete your post");
  }
  console.log("Your post is deleted");
  return res.status(200).send("Post has been deleted");
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
