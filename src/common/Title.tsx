import { twMerge } from "tailwind-merge";
import { ComponentWithClassNameAndChildrenProps } from "../types";

const Title: React.FC<ComponentWithClassNameAndChildrenProps> = ({
  children,
  className,
}) => {
  return <h1 className={twMerge("text-4xl", className)}>{children}</h1>;
};

export default Title;
