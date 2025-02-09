import React from "react";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

function SinglePostPage() {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["postData"],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col gap-8">
      {/* Detail */}
      <div className="flex gap-8">
        {/* Text Div */}
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Wrriten By</span>
            <Link className="text-blue-500">
              {data.user ? data.user.username : "unknown"}
            </Link>
            <span>On</span>
            <Link className="text-blue-800">Web Design</Link>
            <span>{format(data.createdAt)}</span>
          </div>

          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>

        {/* Image div */}
        <div className="hidden lg:block w-2/5">
          {data.image && <Image path={data.image} className="rounded-2xl" />}
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Text */}
        <div className="lg:text-lg flex-1 flex flex-col gap-6 text-justify">
          {data.content}

          <Comments postId={data._id} />
        </div>

        {/* Side Bar */}
        <div className="px-4 h-max lg:w-1/4 sticky top-8">
          <h1 className="mb-1 text-sm font-medium">Author</h1>
          <div className="flex items-center gap-4 mb-1">
            {data.image && (
              <img
                src={data.user?.image}
                className="w-12 h-12 rounded-full object-cover"
                width="48"
                height="48"
              />
            )}
            <Link className="text-blue-800">
              {data.user ? data.user.username : "unknown"}
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Non aute mollit excepteur ipsum in qui eiusmod fugiat fugiat sunt
            voluptate velit pariatur.
          </p>

          <div className="flex gap-2 mt-2">
            <Link>
              <Image path="facebook.svg" />
            </Link>
            <Link>
              <Image path="instagram.svg" />
            </Link>
          </div>

          <PostMenuActions />

          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline">All</Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Search Engine
            </Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage;
