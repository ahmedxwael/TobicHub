import { Task } from "./types";

export function getTasksCollection(tasks: Task[]) {
  const allTasks = [];
  const completedTasks = [];
  const uncompletedTasks = [];
  const importantTasks = [];

  for (const task of tasks) {
    if (task.isCompleted) {
      completedTasks.push(task);
    } else {
      uncompletedTasks.push(task);
    }

    if (task.isImportant) {
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
