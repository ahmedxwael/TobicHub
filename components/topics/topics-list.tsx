import { TopicType } from "@/types";
import { getSearchTopics, getTopics, getUserTopics } from "@/utils/topic-utils";
import React from "react";
import { Pagination } from "../pagination/pagination";
import TopicCard from "./topic-card";

type Props = {
  topics?: TopicType[];
  userId?: string;
  query?: string;
};

const TopicsList = async ({ userId, query }: Props) => {
  const topics = userId
    ? await getUserTopics(userId)
    : query
    ? await getSearchTopics(query)
    : await getTopics();

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
          <TopicCard key={topic._id} topic={topic} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default TopicsList;
