import prisma from "@/prisma";
import axios from "axios";
import { Task } from "../types";

export async function getUserTasks(
  userId: string
): Promise<Task[] | undefined> {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: { created_at: "desc" },
    });

    return tasks;
  } catch (error) {
    return undefined;
  }
}

export async function createTask(task: Task | Partial<Task>) {
  await axios.post("/api/tasks", task).catch(() => {
    throw new Error("Something went wrong. Couldn't create the task.");
  });
}

export async function updateTask(id: string, task: Task | Partial<Task>) {
  await axios.patch(`/api/tasks/${id}`, task).catch(() => {
    throw new Error("Something went wrong. Couldn't update the task.");
  });
}

export async function deleteTask(id: string) {
  await axios.delete(`/api/tasks/${id}`).catch(() => {
    throw new Error("Something went wrong. Couldn't delete the task.");
  });
}

export async function deleteManyTasks(ids: string[]) {
  await axios.delete("/api/tasks", { data: { ids } }).catch(() => {
    throw new Error("Something went wrong. Couldn't delete the tasks.");
  });
}
