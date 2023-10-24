import { twMerge } from "tailwind-merge";
import { ComponentWithClassNameAndChildrenProps } from "../types";

const SubContainer: React.FC<ComponentWithClassNameAndChildrenProps> = ({
  children,
  className,
}) => {
  return (
    <div className={twMerge("bg-neutral-800 rounded-lg p-8", className)}>
      {children}
    </div>
  );
};

export default SubContainer;
