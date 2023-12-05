type CheckProps = {
  check: string;
};

const checkMappings: Record<string, { className: string; text: string }> = {
  regular: {
    className: "bg-primary-light dark:bg-primary-dark text-white dark:text-black",
    text: "Regular",
  },
  "early-bird": {
    className: "bg-primary-light dark:bg-primary-dark text-white dark:text-black",
    text: "Early Bird",
  },
  "parking-pass": {
    className: "bg-primary-light dark:bg-primary-dark text-white dark:text-black",
    text: "Parking Pass",
  },
  standard: {
    className: "border-2 w-fit border-yellow-700 text-yellow-700 font-bold",
    text: "Standard",
  },
  vip: {
    className: "border-2 w-fit border-red-700 text-red-700 font-bold",
    text: "VIP",
  },
  vvip: {
    className: "border-2 w-fit border-teal-700 text-teal-700 font-bold",
    text: "VVIP",
  },
};

function TicketCheck({ check }: CheckProps) {
  const classNames = `px-2 py-1 rounded capitalize ${checkMappings[check].className}`;
  return <div className={classNames}>{checkMappings[check].text}</div>;
}

export default TicketCheck;
