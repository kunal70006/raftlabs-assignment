import { BiHome, BiUser, BiUserPlus, BiLogOut } from "react-icons/bi";
import Icon from "../common/Icon";
import { toast } from "react-hot-toast";
import { SupabaseClient } from "../clients/Supabase.client";

const Navbar = () => {
  async function handleSignOut() {
    const { error } = await SupabaseClient.auth.signOut();
    if (error) {
      toast.error(error.message);
    }
  }
  return (
    <nav className="flex bg-neutral-900 text-lg py-2 justify-between lg:px-24 px-8">
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
          <Icon size="36" route="followers">
            <BiUserPlus />
          </Icon>
          <p className="">Tags</p>
        </div>
        <div className="flex flex-col items-center justify-end text-white text-sm gap-1">
          <button className="text-3xl" onClick={handleSignOut}>
            <BiLogOut />
          </button>
          <p className="">Logout</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
