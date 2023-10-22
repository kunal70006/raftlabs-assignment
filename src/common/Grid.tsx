import { ComponentWithOnlyChildrenProp } from "../types";

const Grid: React.FC<ComponentWithOnlyChildrenProp> = ({ children }) => {
  return (
    <div className="mt-2 grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
      {children}
    </div>
  );
};

export default Grid;
