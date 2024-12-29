import { Task } from "@prisma/client";

export function getTasksCollection(tasks: Task[]) {
  const allTasks = [];
  const completedTasks = [];
  const uncompletedTasks = [];
  const importantTasks = [];

  for (const task of tasks) {
    if (task.completed) {
      completedTasks.push(task);
    } else {
      uncompletedTasks.push(task);
    }

    if (task.important) {
      importantTasks.push(task);
    }

    allTasks.push(task);
  }

  return {
    allTasks,
    importantTasks,
    completedTasks,
    uncompletedTasks,
  };
}
