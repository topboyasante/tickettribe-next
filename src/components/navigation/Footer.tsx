import Link from "next/link";

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
];

function Footer() {
  return (
    <footer className="w-full dark:text-white">
      <div className="w-full max-w-screen-xl mx-auto p-5 xl:px-0 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              <p className="text-sm md:text-md lg:text-2xl dark:text-white">
                ticket
                <span className="text-primary-light dark:text-primary-dark">
                  tribe
                </span>
              </p>
            </span>
          </a>
          <ul className="flex flex-wrap gap-5 items-center mb-6 text-sm font-medium sm:mb-0">
            {pageLinks.map((item) => {
              return (
                <Link href={`${item.href}`} key={item.id}>
                  {item.name}
                </Link>
              );
            })}
          </ul>
        </div>
        <hr className="my-6 sm:mx-auto border dark:border-white lg:my-8" />
        <span className="block text-sm dark:text-white sm:text-center">
          © 2023{" "}
          <a href="3" className="hover:underline">
            TicketTribe™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
