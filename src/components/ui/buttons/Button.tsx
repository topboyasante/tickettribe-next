import { ReactNode } from "react";
import Loader from "../loaders/Loader";

type ButtonProps = {
  children: ReactNode;
  size: "xs" | "sm" | "x-wide";
  type:
    | "primary"
    | "outline"
    | "text-primary"
    | "text-white"
    | "white-bg"
    | "danger";
  isPerformingAction?: boolean;
  onClick?: () => void;
};

const buttonTypeClasses = {
  primary: "bg-primary-light dark:bg-primary-dark text-white dark:text-black",
  "white-bg": "bg-white text-primary-light dark:text-primary-dark",
  outline:
    "border border-primary-primary-light dark:border-primary-dark text-white",
  "text-primary": "text-primary-light dark:text-primary-dark",
  "text-white": "text-white",
  danger: "bg-red-700 text-white",
};

const buttonSizeClasses = {
  xs: "px-2 py-1",
  sm: "px-4 py-2",
  "x-wide": "px-5 py-2",
};

function Button({
  type,
  children,
  isPerformingAction,
  onClick,
  size,
}: ButtonProps) {
  const classNames = `${buttonSizeClasses[size]} rounded ${buttonTypeClasses[type]}`;

  return (
    <button
      className={classNames}
      disabled={isPerformingAction}
      onClick={onClick}
    >
      {isPerformingAction ? (
        <Loader width="30" height="30" color="#006d77" />
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
