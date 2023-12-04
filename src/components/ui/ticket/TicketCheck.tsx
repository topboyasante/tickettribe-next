type CheckProps = {
  check: string;
};

const checkMappings: Record<string, { className: string; text: string }> = {
  regular: {
    className: "bg-primary text-white",
    text: "Regular",
  },
  "early-bird": {
    className: "bg-primary text-white",
    text: "Early Bird",
  },
  "parking-pass": {
    className: "bg-primary text-white",
    text: "Parking Pass",
  },
  standard: {
    className: "text-yellow-700 font-bold",
    text: "Standard",
  },
  vip: {
    className: "text-red-700 font-bold",
    text: "VIP",
  },
  vvip: {
    className: "text-teal-700 font-bold",
    text: "VVIP",
  },
};

function TicketCheck({ check }: CheckProps) {
  const classNames = `px-2 py-1 rounded capitalize ${checkMappings[check].className}`;
  return <div className={classNames}>{checkMappings[check].text}</div>;
}

export default TicketCheck;
