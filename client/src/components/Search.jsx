import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Search() {
  const location = useLocation();
  const navigator = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      const searchQuery = e.target.value;
      if (location.pathname === "/posts") {
        setSearchParams({
          ...Object.fromEntries(searchParams),
          search: searchQuery,
        });
      } else {
        navigator(`/posts?search=${searchQuery}`);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray"
        strokeWidth="2"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        onKeyDown={handleKeyPress}
        type="text"
        placeholder="Search a post.."
        className="bg-transparent focus:outline-none"
      />
    </div>
  );
}

export default Search;
