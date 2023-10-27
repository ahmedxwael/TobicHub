import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TopicType } from "@/types";
import {
  getAllTopics,
  getApprovedTopics,
  getSearchTopics,
  getUserTopics,
} from "@/utils/topic-utils";
import { getServerSession } from "next-auth";
import React from "react";
import { Pagination } from "../pagination/pagination";
import TopicCard from "./topic-card";

export type TopicsTypeType = "approved" | "search" | "user" | "admin";

type Props = {
  topics?: TopicType[];
  userId?: string;
  query?: string;
  type: TopicsTypeType;
};

function getTopics(type: TopicsTypeType, query?: string, userId?: string) {
  switch (type) {
    case "approved": {
      return getApprovedTopics();
    }
    case "search": {
      return getSearchTopics(query!);
    }
    case "user": {
      return getUserTopics(userId!);
    }
    case "admin": {
      return getAllTopics();
    }
  }
}

const TopicsList = async ({ type, userId, query }: Props) => {
  const topics = await getTopics(type, query, userId);
  const session = await getServerSession(authOptions);

  if (!topics || topics.length === 0) {
    return (
      <p className="p-6 text-center text-xl font-bold">
        There is no topics to show
      </p>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        {topics.map((topic) => (
          <TopicCard session={session} key={topic._id} topic={topic} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default TopicsList;
