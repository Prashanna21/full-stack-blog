import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

function SideMenu() {
  return (
    <div className="sticky px-4 h-max  top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mb-4 mt-8 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sort"
            value="newest"
            className="appearance-none bg-transparent w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-500  cursor-pointer"
          />
          Newest
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sort"
            value="most-popular"
            className="appearance-none bg-transparent w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-500  cursor-pointer"
          />
          Most Popular
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sort"
            value="trending"
            className="appearance-none bg-transparent w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-500  cursor-pointer"
          />
          Trending
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sort"
            value="oldest"
            className="appearance-none bg-transparent w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-500  cursor-pointer"
          />
          Oldest
        </label>
      </div>
      <h1 className="mb-4 mt-8 text-sm font-medium">Category</h1>

      <div className="flex flex-col gap-2 text-sm">
        <Link className="underline" to="/posts">
          All
        </Link>
        <Link className="underline" to="/posts?cat=web-design">
          Web Design
        </Link>
        <Link className="underline" to="/posts?cat=developmet">
          Development
        </Link>
        <Link className="underline" to="/posts?cat=databases">
          Databases
        </Link>
        <Link className="underline" to="/posts?cat=search-engine">
          Search Engine
        </Link>
        <Link className="underline" to="/posts?cat=marketing">
          Marketing
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
