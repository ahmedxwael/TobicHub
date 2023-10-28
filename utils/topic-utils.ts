import { BASE_URL } from "@/shared/variables";
import { NewTopicType, TopicType } from "@/types";
import axios from "axios";

export async function addTopic(newTopic: NewTopicType) {
  await axios.post("/api/topics", newTopic).catch(() => {
    throw new Error("Something went wrong.");
  });
}

export async function editTopic(
  topicId: string,
  updatedTopic: Partial<TopicType> | TopicType
) {
  await axios.patch(`/api/topics/${topicId}`, updatedTopic).catch(() => {
    throw new Error("Something went wrong.");
  });
}

export async function deleteTopic(id: string) {
  await axios.delete(`/api/topics/${id}`).catch(() => {
    throw new Error("Couldn't delete the topic.");
  });
}

export const getTopic = async (id: string): Promise<TopicType | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/topics/${id}`, {
      next: { tags: ["topics"] },
    });

    if (!response.ok) {
      return undefined;
    }

    return response.json();
  } catch (error: any) {
    throw new Error("Could not retrieve the list of topics.");
  }
};

export const getApprovedTopics = async (): Promise<TopicType[] | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/topics`, {
      next: { tags: ["topics"] },
    });

    if (!response.ok) {
      return undefined;
    }

    return response.json();
  } catch (error: any) {
    throw new Error("Could not retrieve the list of topics.");
  }
};

export const getAllTopics = async (): Promise<TopicType[] | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/topics/admin`, {
      next: { tags: ["topics"] },
    });

    if (!response.ok) {
      return undefined;
    }

    return response.json();
  } catch (error: any) {
    throw new Error("Could not retrieve the list of topics.");
  }
};

export const getUserTopics = async (
  id: string
): Promise<TopicType[] | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/topics/user?id=${id}`, {
      next: { tags: ["topics"] },
    });

    if (!response.ok) {
      return undefined;
    }

    return response.json();
  } catch (error: any) {
    throw new Error("Could not retrieve the list of topics.");
  }
};

export const getSearchTopics = async (
  query: string
): Promise<TopicType[] | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/topics/search?q=${query}`, {
      next: { tags: ["topics"] },
    });

    if (!response.ok) {
      return undefined;
    }

    return response.json();
  } catch (error: any) {
    throw new Error("Could not retrieve the list of topics.");
  }
};
