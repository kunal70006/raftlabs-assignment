import { twMerge } from "tailwind-merge";
import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={twMerge(
        "bg-blue-600 rounded-lg text-sm px-3 py-1.5 mt-4 text-white disabled:bg-red-600 disabled:cursor-not-allowed font-medium",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
