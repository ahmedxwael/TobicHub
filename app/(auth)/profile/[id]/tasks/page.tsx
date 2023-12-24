import { authOptions } from "@/app/api/auth/options";
import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
import AddTask from "@/modules/user/components/tasks/table/add-task";
import TasksTable from "@/modules/user/components/tasks/table/tasks-table";
import { getUserTasks } from "@/modules/user/services/tasks-services";
import { Task, UserSessionType } from "@/modules/user/types";
import { URLS } from "@/shared/urls";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type TasksPageProps = {
  params: {
    id: string;
  };
};

export const revalidate = 0;

export default async function TasksPage({ params }: TasksPageProps) {
  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserSessionType;

  if (!userSession || userSession.id !== params.id || !userSession.admin) {
    redirect(URLS.profile.view(params.id));
  }

  const tasks = await getUserTasks(params.id);

  if (!tasks) {
    return <NotFound message="Couldn't get user's tasks." />;
  }

  return (
    <section className="flex-1">
      <div className="flex w-full flex-col gap-12">
        <div className="flex w-full flex-wrap items-center justify-between gap-6">
          <PageHeading>Tasks</PageHeading>
          <AddTask userId={params.id} />
        </div>
        <TasksTable tasks={tasks} />
      </div>
    </section>
  );
}
