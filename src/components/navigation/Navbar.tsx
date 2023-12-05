"use client";
import { useSession, signOut } from "next-auth/react";
import { BiChevronDown } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { BsTicketPerforated, BsCalendarEvent } from "react-icons/bs";
import Avatar from "react-avatar";
import Link from "next/link";
import Logo from "../ui/logo/Logo";
import Button from "../ui/buttons/Button";
import DropDown from "../ui/dropdown/DropDown";
import DarkModeToggle from "../ui/dark-mode/DarkModeToggle";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";

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

function AuthNavbar() {
  const session = useSession();
  const token = session.data?.user.token;
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);
  return (
    <main>
      {token ? (
        <header>
          <nav className="w-full h-[7vh] fixed left-0 top-0 z-50 bg-bg-light dark:bg-bg-dark">
            <section className="max-w-screen-xl mx-auto flex w-full h-full justify-between items-center p-5 xl:px-0">
              {/* Left */}
              <Link href={`/events`}>
                <Logo />
              </Link>
              {/* Right */}
              <section className="hidden lg:flex gap-2 items-center">
                <section className="flex items-center">
                  <DarkModeToggle />
                  <Link href={`/events/create`}>
                    <Button size="sm" type="text-primary">
                      Create Event
                    </Button>
                  </Link>
                </section>
                <DropDown
                  MenuButtonContent={
                    <section className="flex items-center">
                      <section className="flex items-center gap-2">
                        <Avatar
                          name={session.data?.user?.name as string}
                          round
                          size="30"
                          maxInitials={2}
                        />
                        <p className="hidden xl:block">
                          {session.data?.user?.name}
                        </p>
                      </section>
                      <BiChevronDown className="text-xl" />
                    </section>
                  }
                  MenuItemsContent={
                    <section className="flex flex-col gap-3">
                      <Link href={`/events`}>
                        <section className="flex items-center gap-3">
                          <BsCalendarEvent />
                          <p className="font-semibold text-sm">All Events</p>
                        </section>
                      </Link>
                      <Link href={`/events/my-events`}>
                        <section className="flex items-center gap-3">
                          <BsCalendarEvent />
                          <p className="font-semibold text-sm">My Events</p>
                        </section>
                      </Link>
                      <Link href={`/tickets`}>
                        <section className="flex items-center gap-3">
                          <BsTicketPerforated />
                          <p className="font-semibold text-sm">Tickets</p>
                        </section>
                      </Link>
                      <Link href={`/profile`}>
                        <section className="flex items-center gap-3">
                          <AiOutlineUser />
                          <p className="font-semibold text-sm">Profile</p>
                        </section>
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3"
                      >
                        <FiLogOut />
                        <p className="font-semibold text-sm">Log Out</p>
                      </button>
                    </section>
                  }
                />
              </section>
              {/* Right - Mobile */}
              <section className="lg:hidden flex items-center gap-2">
                <DarkModeToggle />
                <DropDown
                  MenuButtonContent={
                    <section className="flex items-center">
                      <section className="flex items-center gap-2">
                        <Avatar
                          name={session.data?.user?.name as string}
                          round
                          size="35"
                          maxInitials={2}
                        />
                      </section>
                      <BiChevronDown className="text-xl" />
                    </section>
                  }
                  MenuItemsContent={
                    <section className="flex flex-col gap-3">
                      <Link href={`/events`}>
                        <section className="flex items-center gap-3">
                          <BsCalendarEvent />
                          <p className="font-semibold text-sm">All Events</p>
                        </section>
                      </Link>
                      <Link href={`/events/my-events`}>
                        <section className="flex items-center gap-3">
                          <BsCalendarEvent />
                          <p className="font-semibold text-sm">My Events</p>
                        </section>
                      </Link>
                      <Link href={`/tickets`}>
                        <section className="flex items-center gap-3">
                          <BsTicketPerforated />
                          <p className="font-semibold text-sm">Tickets</p>
                        </section>
                      </Link>
                      <Link href={`/profile`}>
                        <section className="flex items-center gap-3">
                          <AiOutlineUser />
                          <p className="font-semibold text-sm">Profile</p>
                        </section>
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3"
                      >
                        <FiLogOut />
                        <p className="font-semibold text-sm">Log Out</p>
                      </button>
                    </section>
                  }
                />
              </section>
            </section>
          </nav>
        </header>
      ) : (
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
      )}
    </main>
  );
}

export default AuthNavbar;
