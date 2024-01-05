import { authOptions } from "@/app/api/auth/options";
import NotFound from "@/components/not-found";
import ProfileCard from "@/modules/user/components/profile/profile-card";
import { getUser } from "@/modules/user/services/profile-services";
import { UserSessionType } from "@/modules/user/types";
import { ParamsType } from "@/shared/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

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
  const userSession = session?.user as UserSessionType | undefined;

  return (
    <section className="flex w-[800px] max-w-full flex-col gap-10">
      <ProfileCard userSession={userSession} user={user} />
    </section>
  );
}

Profile;
