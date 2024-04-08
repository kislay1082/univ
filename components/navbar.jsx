"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { buttonVariants } from "./ui/button";
import { UserAccount } from "./user-account";
import { useRouter } from "next/navigation";

import debounce from "lodash.debounce";

const Navbar = ({ user }) => {
  const router = useRouter();

  const [toggleSearch, setToggleSearch] = useState(false);

  const onSearch = (e) => {
    console.log(e.target.value);
    router.push(`/search/?query=${e.target.value}`);
  };

  return (
    <header className="container px-4 sm:px-8 z-40 bg-background">
      <div className="flex h-20 items-center justify-between py-6">
        <div className="flex gap-6 md:gap-10">
          <Link className="items-center space-x-2 flex" href="/">
            <FaBook size={24} />
            <span className="font-bold hidden sm:inline-block">Uniconnect</span>
          </Link>
          <form className="hidden md:block">
            <div className="relative">
              <button
                type="submit"
                className="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <IoSearch />
                <span className="sr-only">Search icon</span>
              </button>
              <input
                type="text"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="Search..."
                onChange={debounce(onSearch, 500, { maxWait: 1000 })}
              />
            </div>
          </form>
        </div>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Link
                href="/sell"
                className={buttonVariants({ variant: "ghost" })}
              >
                Create an ad
              </Link>
              <UserAccount user={user} />
            </>
          ) : (
            <>
              <Link
                href="/register"
                className={buttonVariants({ variant: "ghost" })}
              >
                Create an ad
              </Link>
              <Link href="/register" className={buttonVariants()}>
                Sign In
              </Link>
            </>
          )}
          <IoSearch
            size={24}
            className="md:hidden"
            onClick={() => setToggleSearch((prev) => !prev)}
          />
        </div>
      </div>
      {toggleSearch && (
        <form className="md:hidden">
          <div className="relative">
            <button
              type="submit"
              className="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <IoSearch />
              <span className="sr-only">Search icon</span>
            </button>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Search..."
              onChange={onSearch}
            />
          </div>
        </form>
      )}
    </header>
  );
};

export default Navbar;
