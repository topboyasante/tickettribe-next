import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { MdPassword } from "react-icons/md";

const navigationLinks = [
  {
    href: "/settings/security/change-password",
    icon: <MdPassword />,
    text: "Change Password",
  },
];

function Page() {
  return (
    <section className="max-w-screen-xl mx-auto">
      <section className="p-5">
        <section>
          <h1 className="font-semibold text-xl lg:text-3xl xl:text-4xl mb-2">
            Security
          </h1>
          <p className="text-[#777777]">Change your Security Settings</p>
        </section>
        <br />
        <section className="flex flex-col gap-5">
          {navigationLinks.map((item, index) => {
            return (
              <Link href={item.href} key={index}>
                <div className="border-2 dark:border-[#404040] p-5 rounded flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    {item.icon}
                    <p className="text-lg">{item.text}</p>
                  </div>
                  <BsChevronRight />
                </div>
              </Link>
            );
          })}
        </section>
      </section>
    </section>
  );
}

export default Page;
