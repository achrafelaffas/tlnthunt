import { Target } from "lucide-react";
import { Link } from "react-router-dom";
import MenuLink from "./MenuItem";

const Navbar = () => {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-2 md:text-sm lg:gap-3">
      <Link
        to="/"
        className="flex items-center gap-4 text-lg font-semibold md:text-base"
      >
        <Target className="h-6 w-6" />
        Tlnthunt
      </Link>
      <MenuLink to="/projects">Projects</MenuLink>
      <MenuLink to="/my-projects">My Projects</MenuLink>
      <MenuLink to="/proposals">Proposals</MenuLink>
    </nav>
  );
};

export default Navbar;
