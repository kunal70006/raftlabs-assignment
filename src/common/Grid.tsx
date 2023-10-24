import { twMerge } from "tailwind-merge";
import { ComponentWithClassNameAndChildrenProps } from "../types";

const Grid: React.FC<ComponentWithClassNameAndChildrenProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "mt-2 grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Grid;
