import { useEffect, useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  // useEffect(() => {
  //   getToken().then((token) => console.log(token));
  // });

  return (
    <nav className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/">
        <div className="flex justify-between gap-4 text-2xl font-bold">
          <Image path="./logo.png" h="32" w="32" />
          <span>Lamalog</span>
        </div>
      </Link>
      {/* MOBILE MENU */}
      <div className="visible md:hidden ">
        <div
          className="cursor-pointer text-xl font-bold"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "≣"}
        </div>

        {/* Mobile Link List */}
        <div
          className={`w-full flex bg-[#e6e6ff] flex-col gap-12 text-3xl items-center justify-center fixed top-16 left-0 right-0 bottom-0 transition-all ease-out ${
            open ? " translate-x-0" : "translate-x-full"
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="/login">
            <button className="py-2 px-6 rounded-3xl bg-blue-800 text-white">
              Login
            </button>
          </Link>
        </div>
      </div>
      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-7 xl:gap-10 xl:text-lg font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-6 rounded-3xl bg-blue-800 text-white">
              Login
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;
