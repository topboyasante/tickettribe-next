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

function AuthNavbar() {
  const session = useSession();

  return (
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
                    <p className="hidden xl:block">{session.data?.user?.name}</p>
                  </section>
                  <BiChevronDown className="text-xl" />
                </section>
              }
              MenuItemsContent={
                <section>
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
                <section>
                  <p>{session.data?.user?.name}</p>
                  <br />
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
  );
}

export default AuthNavbar;
