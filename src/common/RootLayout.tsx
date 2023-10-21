import { ComponentWithOnlyChildrenProp } from "../types";

const RootLayout: React.FC<ComponentWithOnlyChildrenProp> = ({ children }) => {
  return <div className="min-h-screen w-screen bg-neutral-950">{children}</div>;
};

export default RootLayout;
