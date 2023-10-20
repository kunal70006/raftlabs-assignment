import { BiHome, BiUser, BiAddToQueue, BiUserPlus } from "react-icons/bi";
import Icon from "../common/Icon";

const Navbar = () => {
  return (
    <nav className="flex bg-neutral-900 text-lg py-2 justify-between lg:px-24">
      <div className="flex flex-col items-center text-white text-sm gap-1">
        <Icon size="36" route="/">
          <BiHome />
        </Icon>
        <p className="">Home</p>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col items-center text-white text-sm gap-1">
          <Icon size="36" route="profile">
            <BiUser />
          </Icon>
          <p className="">Profile</p>
        </div>
        <div className="flex flex-col items-center text-white text-sm gap-1">
          <Icon size="36" route="create">
            <BiAddToQueue />
          </Icon>
          <p className="">Create Post</p>
        </div>
        <div className="flex flex-col items-center text-white text-sm gap-1">
          <Icon size="36" route="followers">
            <BiUserPlus />
          </Icon>
          <p className="">Followers</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
