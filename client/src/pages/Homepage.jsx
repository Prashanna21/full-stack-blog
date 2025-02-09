import React from "react";
import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPost from "../components/FeaturedPost";
import PostList from "../components/PostList";

function Homepage() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* BREADCRUMB */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span> • </span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>

      {/* INTRODUCTION */}
      <div className="flex items-center justify-between">
        {/* TITLES */}
        <div className="">
          <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-5xl font-bold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </h1>
          <p className="mt-2 md:mt-8 text-sm md:text-xl ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
        </div>
        {/* ANIMATED BUTTON */}
        <Link
          to="/write"
          className="hidden md:block relative animatedButtonDiv"
        >
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-wide animate-spin animatedButton"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •{" "}
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your story •{" "}
              </textPath>
            </text>
          </svg>
          <button className="bg-blue-700 rounded-full m-auto w-20 h-20 flex items-center justify-center absolute top-0 bottom-0 right-0 left-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>

      {/* Categories */}
      <MainCategories />

      {/* Featured Posts */}
      <FeaturedPost />
      {/* Post List */}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Post</h1>
        <PostList />
      </div>
    </div>
  );
}

export default Homepage;
