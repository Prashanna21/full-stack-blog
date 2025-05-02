import postsModel from "../models/posts.model.js";

const increaseVisits = async (req, res, next) => {
  const slug = req.params.slug;

  await postsModel.findOneAndUpdate({ slug }, { $inc: { visits: 1 } });

  next();
};

export default increaseVisits;
