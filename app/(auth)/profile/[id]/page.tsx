import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
import { Separator } from "@/components/ui/separator";
import ProfileCard from "@/modules/user/components/profile/profile-card";
import { getUser } from "@/modules/user/services/profile-services";
import { ParamsType } from "@/shared/types";
import { Metadata } from "next";

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
  // const session = await getServerSession(authOptions);
  // const userSession = session?.user as UserSessionType | undefined;

  return (
    <section className="flex w-[800px] max-w-full flex-col gap-10">
      <ProfileCard user={user} />
    </section>
  );
}

Profile;
