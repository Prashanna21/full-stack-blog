import React, { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

function Postlistpage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h1 className="mb-8 text-2xl">Development Blog</h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden bg-blue-500 text-sm text-white px-4 py-2 rounded-2xl my-4"
      >
        {open ? "Close" : "Filter Or Search"}
      </button>
      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="">
          <PostList />
        </div>

        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
}

export default Postlistpage;
