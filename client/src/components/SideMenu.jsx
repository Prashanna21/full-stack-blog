import React from "react";
import Search from "./Search";
import { Link, useSearchParams } from "react-router-dom";

function SideMenu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sort: e.target.value,
    });
  };

  const handleCategoryChange = (value) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      cat: value,
    });
  };

  return (
    <div className="sticky px-4 h-max  top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mb-4 mt-8 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2">
          <input
            onChange={handleChange}
            type="radio"
            name="sort"
            value="newest"
            className="appearance-none bg-transparent w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-500  cursor-pointer"
          />
          Newest
        </label>

        <label className="flex items-center gap-2">
          <input
            onChange={handleChange}
            type="radio"
            name="sort"
            value="popular"
            className="appearance-none bg-transparent w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-500  cursor-pointer"
          />
          Most Popular
        </label>

        <label className="flex items-center gap-2">
          <input
            onChange={handleChange}
            type="radio"
            name="sort"
            value="trending"
            className="appearance-none bg-transparent w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-500  cursor-pointer"
          />
          Trending
        </label>

        <label className="flex items-center gap-2">
          <input
            onChange={handleChange}
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
        <Link
          value="web-design"
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("web-design")}
        >
          Web Design
        </Link>
        <Link
          value="development"
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("development")}
        >
          Development
        </Link>
        <Link
          value="databases"
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("databases")}
        >
          Databases
        </Link>
        <Link
          value="search-engine"
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("search-engine")}
        >
          Search Engine
        </Link>
        <Link
          value="marketing"
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("marketing")}
        >
          Marketing
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
