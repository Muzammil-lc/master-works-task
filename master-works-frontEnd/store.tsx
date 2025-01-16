import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./src/reducers/taskSlice";

// Configure the store
const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Add more reducers here if needed
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
