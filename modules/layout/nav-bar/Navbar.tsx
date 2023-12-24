import { authOptions } from "@/app/api/auth/options";
import { ModeToggle } from "@/components/toggle-mode-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserSessionType } from "@/modules/user/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import NavLinks from "./nav-links";
import SideBar from "./side-bar";
import UserActions from "./user-actions";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserSessionType | undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/60 backdrop-blur-lg">
      <nav className="container flex items-center justify-between gap-4 px-8 py-4 md:gap-8">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <Link href="/" className="text-xl font-bold text-primary">
                TopicHub
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              Talking about general and different stuff.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <NavLinks isAdmin={userSession?.admin} />
        </div>
        <div className="ml-auto hidden shrink-0 items-center gap-4 md:flex">
          <ModeToggle />
          <UserActions userSession={userSession} />
        </div>

        <SideBar userSession={userSession} />
      </nav>
    </header>
  );
};

export default Navbar;
