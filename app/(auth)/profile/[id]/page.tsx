import { authOptions } from "@/app/api/auth/options";
import NotFound from "@/components/not-found";
import { Separator } from "@/components/ui/separator";
import UserImage from "@/modules/user/components/profile/user-image";
import UserName from "@/modules/user/components/profile/user-name";
import { getUser } from "@/modules/user/services/profile-services";
import { ParamsType } from "@/shared/types";
import { urls } from "@/shared/urls";
import { User } from "@prisma/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
  params: { id },
}: ParamsType): Promise<Metadata> => {
  const user = await getUser(id);

  if (!user) {
    return {
      title: "Unknown user",
      description: `Unknown profile page.`,
    };
  }

  return {
    title: `${user?.name} | TopicHub`,
    description: `${user?.name} profile page.`,
  };
};

export default async function Profile({ params: { id } }: ParamsType) {
  const user = await getUser(id);

  if (!user) {
    return <NotFound message="Couldn't get the user's data." />;
  }
  const session = await getServerSession(authOptions);
  const userSession = session?.user as User;

  if (!userSession) {
    redirect(urls.home);
  }

  return (
    <section className="flex w-[800px] max-w-full flex-col gap-10">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <UserImage user={user} userSession={userSession} />
        <div>
          <UserName userSession={userSession} user={user} />
          <div className="mt-2 flex items-center justify-center gap-2 capitalize text-muted-foreground">
            joined at:
            <span className="font-medium">{user.createdAt.toDateString()}</span>
          </div>
        </div>
        <Separator className="my-6" />
        <ul className="flex w-full flex-col items-start gap-2 capitalize">
          <li>
            topics: <span className="font-medium">{user.topicsCount}</span>
          </li>
          <li>
            comments: <span className="font-medium">{user.commentsCount}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

Profile;
