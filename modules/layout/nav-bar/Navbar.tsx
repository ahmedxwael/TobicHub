import { authOptions } from "@/app/api/auth/options";
import { ModeToggle } from "@/components/toggle-mode-button";
import { UserSessionType } from "@/modules/user/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import NavLinks from "./nav-links";
import SideBar from "./side-bar";
import UserButtons from "./user-buttons";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserSessionType;

  return (
    <header className="sticky top-0 z-10 border-b border-b-input bg-transparent backdrop-blur-lg">
      <nav className="container flex items-center justify-between gap-8 px-8 py-4">
        <Link
          href="/"
          className="text-xl font-bold"
          title="Talking about general and useful stuff"
        >
          TopicHub
        </Link>

        <div className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <NavLinks isAdmin={userSession?.admin} />
        </div>
        <div className="ml-auto hidden shrink-0 items-center gap-4 md:flex">
          <ModeToggle />
          <UserButtons userSession={userSession} />
        </div>

        <SideBar userSession={userSession} />
      </nav>
    </header>
  );
};

export default Navbar;
