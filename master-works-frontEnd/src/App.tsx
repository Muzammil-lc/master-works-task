import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTask,
} from "./reducers/taskSlice";
import CalendarHeader from "./components/CalendarHeader";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { format } from "date-fns";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const [selectedDate, setSelectedDate] = React.useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  useEffect(() => {
    dispatch(fetchTasks(selectedDate));
  }, [selectedDate, dispatch]);

  const handleAddTask = useCallback(
    (inputValue: string) => {
      const newTask = {
        name: inputValue,
        description: "",
        date: selectedDate,
        status: "pending",
        pinned: false,
        memo: "",
        completed: false,
      };
      dispatch(addTask(newTask));
    },
    [dispatch, selectedDate]
  );

  const handleToggleComplete = useCallback(
    (id: string, updatedStatus: string) => {
      dispatch(updateTask({ id, updates: { status: updatedStatus } }));
    },
    [dispatch]
  );

  const handleTogglePin = useCallback(
    (id: string, pinned: boolean) => {
      dispatch(updateTask({ id, updates: { pinned } }));
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      dispatch(deleteTask(id));
    },
    [dispatch]
  );

  const handleAddMemo = useCallback(
    (id: string, memo: string) => {
      dispatch(updateTask({ id, updates: { memo } }));
    },
    [dispatch]
  );

  const sortedTasks = useMemo(() => {
    return tasks.slice().sort((a, b) => {
      if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [tasks]);

  return (
    <div className="min-h-screen bg-pink-500 flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-900 text-white rounded-lg shadow-xl">
        <CalendarHeader
          selectedDate={new Date(selectedDate)}
          onDateChange={(date: Date) =>
            setSelectedDate(format(date, "yyyy-MM-dd"))
          }
        />
        <TaskInput onAddTask={handleAddTask} />
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <TaskList
            tasks={sortedTasks}
            onToggleComplete={handleToggleComplete}
            onTogglePin={handleTogglePin}
            onDeleteTask={handleDeleteTask}
            onAddMemo={handleAddMemo}
          />
        )}
      </div>
    </div>
  );
};

export default App;
