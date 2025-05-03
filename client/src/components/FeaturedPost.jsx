import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchFeaturedPosts = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

function FeaturedPost() {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchFeaturedPosts,
  });

  if (isPending) return "loading....";
  if (error) return "Soemthing went wrong" + error.message;

  const posts = data.posts;
  if (!posts || posts.lenght === 0) return "Post not found";
  console.log(posts);

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First Post */}
      <div className="w-full flex-1 flex flex-col gap-4">
        {/*Image*/}
        <Image path={posts[0].image || "featured1.jpeg"} />
        {/*Details*/}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">0.1</h1>
          <Link className="text-blue-800 lg:text-lg">{posts[0].category}</Link>
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>
        {/*title*/}
        <Link to="/" className="text-xl font-semibold lg:text-3xl lg:font-bold">
          {posts[0].title}
        </Link>
      </div>
      {/* Other Post */}
      <div className="w-full flex-1 flex flex-col gap-4">
        {/* Second */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <Image
            path={posts[1].image || "featured1.jpeg"}
            className="rounded-3xl object-cover w-1/3 aspect-video"
            w="900"
          />
          {/* Details And Title */}
          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
              <h1 className="font-semibold">0.2</h1>
              <span className="text-gray-500 text-sm">
                {format(posts[1].createdAt)}
              </span>
            </div>
            {/* Title */}
            <Link
              to="/"
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-medium"
            >
              {posts[1].title}
            </Link>
          </div>
        </div>
        {/* Third */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <Image
            path={posts[2].image || "featured1.jpeg"}
            className="rounded-3xl object-cover w-1/3 aspect-video"
          />
          {/* Details And Title */}
          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
              <h1 className="font-semibold">0.2</h1>
              <span className="text-gray-500 text-sm">
                {format(posts[2].createdAt)}
              </span>
            </div>
            {/* Title */}
            <Link
              to="/"
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-medium"
            >
              {posts[2].title}
            </Link>
          </div>
        </div>
        {/* Fourth */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <Image
            path={posts[3].image || "featured1.jpeg"}
            className="rounded-3xl object-cover w-1/3 aspect-video"
          />
          {/* Details And Title */}
          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
              <h1 className="font-semibold">0.2</h1>
              <span className="text-gray-500 text-sm">
                {format(posts[3].createdAt)}
              </span>
            </div>
            {/* Title */}
            <Link
              to="/"
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-medium"
            >
              {posts[3].title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
