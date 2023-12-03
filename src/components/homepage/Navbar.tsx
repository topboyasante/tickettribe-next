"use client";
import Button from "../ui/buttons/Button";
import Logo from "../ui/logo/Logo";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "../ui/dark-mode/DarkModeToggle";

const pageLinks = [
  {
    id: 0,
    name: "About",
    href: "about",
  },
  {
    id: 1,
    name: "Pricing",
    href: "pricing",
  },
  {
    id: 2,
    name: "Help",
    href: "help",
  },
  {
    id: 3,
    name: "Sign In",
    href: "auth/sign-in",
  },
];

function Navbar() {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);
  return (
    <header>
      <nav className="w-full h-[7vh] fixed left-0 top-0 z-50 bg-bg-light dark:bg-bg-dark">
        <section className="max-w-screen-xl mx-auto flex w-full h-full justify-between items-center p-5 xl:px-0">
          {/* Left */}
          <Link href={`/`}>
            <Logo />
          </Link>
          {/* Right */}
          <section className="hidden lg:flex gap-5 items-center">
            <DarkModeToggle />
            <section className="flex items-center gap-5">
              {pageLinks.map((item) => {
                return (
                  <Link href={`${item.href}`} key={item.id}>
                    {item.name}
                  </Link>
                );
              })}
            </section>
            <Link href={`/auth/sign-up`}>
              <Button size="x-wide" type="primary">
                Sign Up
              </Button>
            </Link>
          </section>
          {/* Right - Mobile */}
          <section className="lg:hidden flex items-center gap-3 text-primary text-3xl">
            <DarkModeToggle />
            <button
              onClick={() => setNavIsOpen(!navIsOpen)}
              className="appearance-none outline-none"
            >
              <AiOutlineMenu />
            </button>
          </section>
        </section>
      </nav>
      {/* Navbar For Small Screens */}
      <section
        className={
          navIsOpen
            ? "lg:hidden fixed z-[40] h-auto pt-[7vh] bg-bg-light dark:bg-bg-dark dark:border-b dark:border-b-[#777777] w-full top-0 left-0 ease duration-500"
            : "lg:hidden fixed z-[40] h-auto pt-[7vh] bg-bg-light dark:bg-bg-dark dark:border-b dark:border-b-[#777777] w-full top-[-50vh] left-0 ease duration-500"
        }
      >
        <section className="flex flex-col justify-center gap-5 w-full h-full p-5">
          {pageLinks.map((item) => {
            return (
              <Link
                href={`${item.href}`}
                key={item.id}
                onClick={() => setNavIsOpen(!navIsOpen)}
              >
                {item.name}
              </Link>
            );
          })}
          <section>
            <Link href={`/auth/sign-up`}>
              <Button size="xs" type="primary">
                Sign Up
              </Button>
            </Link>
          </section>
        </section>
      </section>
    </header>
  );
}

export default Navbar;
