import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";

function FeaturedPost() {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First Post */}
      <div className="w-full flex-1 flex flex-col gap-4">
        {/*Image*/}
        <Image path="featured1.jpeg" />
        {/*Details*/}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">0.1</h1>
          <Link className="text-blue-800 lg:text-lg">Web Design</Link>
          <span className="text-gray-500">2 days ago</span>
        </div>
        {/*title*/}
        <Link to="/" className="text-xl font-semibold lg:text-3xl lg:font-bold">
          Enim dolore veniam ad proident consequat consequat excepteur non.
        </Link>
      </div>
      {/* Other Post */}
      <div className="w-full flex-1 flex flex-col gap-4">
        {/* Second */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <Image
            path="featured2.jpeg"
            className="rounded-3xl object-cover w-1/3 aspect-video"
            w="900"
          />
          {/* Details And Title */}
          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
              <h1 className="font-semibold">0.2</h1>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            {/* Title */}
            <Link
              to="/"
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-medium"
            >
              Ea cillum laborum magna amet eiusmod ipsum anim velit excepteur
              exercitation aliqua.
            </Link>
          </div>
        </div>
        {/* Third */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <Image
            path="featured2.jpeg"
            className="rounded-3xl object-cover w-1/3 aspect-video"
          />
          {/* Details And Title */}
          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
              <h1 className="font-semibold">0.2</h1>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            {/* Title */}
            <Link
              to="/"
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-medium"
            >
              Ea cillum laborum magna amet eiusmod ipsum anim velit excepteur
              exercitation aliqua.
            </Link>
          </div>
        </div>
        {/* Fourth */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <Image
            path="featured2.jpeg"
            className="rounded-3xl object-cover w-1/3 aspect-video"
          />
          {/* Details And Title */}
          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
              <h1 className="font-semibold">0.2</h1>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            {/* Title */}
            <Link
              to="/"
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-medium"
            >
              Ea cillum laborum magna amet eiusmod ipsum anim velit excepteur
              exercitation aliqua.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
