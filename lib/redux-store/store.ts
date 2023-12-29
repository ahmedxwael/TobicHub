import { getTopics } from "@/utils/topic-utils";
import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import userTopicsReducer from "./topics/user-topics-slice";

const fetchUserTopics = createAsyncThunk(
  "user/fetchUserTopics",
  async (params: any, { rejectWithValue }) => {
    try {
      const data = await getTopics({
        where: {
          authorId: params.userId,
        },
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const store = configureStore({
  reducer: {
    userTopics: userTopicsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
