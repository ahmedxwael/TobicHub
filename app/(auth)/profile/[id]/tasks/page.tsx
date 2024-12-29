import { authOptions } from "@/app/api/auth/options";
import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
import AddTask from "@/modules/user/components/tasks/table/add-task";
import TasksTable from "@/modules/user/components/tasks/table/tasks-table";
import { getUserTasks } from "@/modules/user/services/tasks-services";
import { UserSessionType } from "@/modules/user/types";
import { GenericObject } from "@/shared/types";
import { urls } from "@/shared/urls";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type TasksPageProps = {
  params: {
    id: string;
  };
  searchParams: GenericObject;
};

export const revalidate = 0;

export default async function TasksPage({ params }: TasksPageProps) {
  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserSessionType;

  if (!userSession || userSession.id !== params.id) {
    redirect(urls.profile.view(params.id));
  }

  const tasks = await getUserTasks(params.id);

  if (!tasks) {
    return <NotFound message="Couldn't get user's tasks." />;
  }

  return (
    <section className="w-full flex-1">
      <div className="flex w-full flex-col gap-12">
        <div className="flex w-full flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <PageHeading>Tasks</PageHeading>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-block">{tasks?.length}</span>
              Task(s)
            </div>
          </div>
          <AddTask userId={params.id} />
        </div>
        <TasksTable tasks={tasks} />
      </div>
    </section>
  );
}
