import Navbar from "../components/Navbar";
import { ComponentWithOnlyChildrenProp } from "../types";

const RootLayout: React.FC<ComponentWithOnlyChildrenProp> = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
