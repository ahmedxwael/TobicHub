import { Topic } from "@/modules/topics/types";
import { PaginationInfo } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";

type UserTopicsSlice = {
  topics: Topic[];
  paginationInfo: PaginationInfo;
};

const initialState: UserTopicsSlice = {
  topics: [],
  paginationInfo: {
    dataCount: 0,
    skip: 0,
    take: 0,
  },
};

export const userTopicsSlice = createSlice({
  name: "userTopics",
  initialState,
  reducers: {
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
  },
});

export const { setTopics } = userTopicsSlice.actions;
export default userTopicsSlice.reducer;
