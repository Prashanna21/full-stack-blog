import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

function PostListItem({ post }) {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-8">
      {post.image && (
        <div className="md:hidden xl:block lg:w-1/3">
          <Image path={post.image} className="rounded-2xl" w="735" />
        </div>
      )}
      {/* Details */}
      <div className=" flex flex-col gap-4 lg:w-2/3">
        <Link to={`/post/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>

        <div className="flex items-center gap-2 text-gray-400">
          <span>Written By: </span>
          <Link className="text-blue-800">
            {post.user?.username ? post.user.username : "Unknown"}
          </Link>
          <span>on </span>
          <Link className="text-blue-800">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>

        <p>{post.desc}</p>
        <Link className="underline text-blue-800 text-sm">Read More</Link>
      </div>
    </div>
  );
}

export default PostListItem;
