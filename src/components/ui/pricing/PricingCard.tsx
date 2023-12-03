import Link from "next/link";

type PricingProps = {
  title: string;
  price: string;
  features: string[];
  buttonLabel: string;
};

const PricingCard = ({ title, price, features, buttonLabel }: PricingProps) => {
  return (
    <div className="col-span-1 bg-bg-light dark:bg-transparent rounded-md overflow-hidden border dark:border-[#404040] h-[430px]">
      <div className="p-6 flex flex-col justify-center h-full">
        <div className="font-semibold text-2xl mb-2">{title}</div>
        <div className="text-xl text-primary-light dark:text-primary-dark">
          GHC {price} per event
        </div>
        <hr className="mt-2 mb-5 dark:border-[#404040]" />
        <ul className="mt-4">
          {features.map((feature, index) => (
            <li key={index} className="mt-2 flex items-center">
              <svg
                className="w-4 h-4 text-primary-light dark:text-primary-dark mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <Link href={`/auth/sign-up`}>
          <button className="my-3 bg-primary-light dark:bg-primary-dark hover:bg-primary/80 ease duration-300 text-white dark:text-black py-2 px-4 w-full rounded">
            {buttonLabel}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
