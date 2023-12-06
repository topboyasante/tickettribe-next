"use client";
import React from "react";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
    suppressHydrationWarning
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="hover:scale-105 ease duration-500 aspect-square p-1 border rounded border-primary-light dark:border-primary-dark grid place-items-center cursor-pointer"
    >
      {theme === "light" ? (
        <RiMoonLine className="text-sm text-primary-light dark:text-primary-dark" />
      ) : (
        <RiSunLine className=" text-sm text-primary-light dark:text-primary-dark" />
      )}
    </button>
  );
};
export default DarkModeToggle;
