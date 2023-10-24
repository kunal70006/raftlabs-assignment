import { IconContext } from "react-icons";
import { IconProps } from "../types";
import { Link } from "react-router-dom";

const Icon: React.FC<IconProps> = ({ children, size, route }) => {
  return (
    <IconContext.Provider value={{ color: "white", size: size }}>
      <Link to={route}>{children}</Link>
    </IconContext.Provider>
  );
};

export default Icon;
