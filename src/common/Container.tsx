import { ComponentWithOnlyChildrenProp } from "../types";

const Container: React.FC<ComponentWithOnlyChildrenProp> = ({ children }) => {
  return (
    <div className="bg-neutral-900 mt-12 lg:mx-24 text-white rounded-lg p-8 flex flex-col gap-12">
      {children}
    </div>
  );
};

export default Container;
