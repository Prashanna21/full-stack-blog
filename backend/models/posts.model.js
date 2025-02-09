import { Schema } from "mongoose";
import mongoose from "mongoose";

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "general",
    },

    slug: {
      type: String,
      unique: true,
    },

    desc: {
      type: String,
    },

    content: {
      type: String,
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    visits: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
