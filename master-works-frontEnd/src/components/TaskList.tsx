import React, { memo } from "react";
import TaskItem, { Task } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string, updatedStatus: string) => void;
  onTogglePin: (id: string, pinned: boolean) => void;
  onDeleteTask: (id: string) => void;
  onAddMemo: (id: string, memo: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onTogglePin,
  onDeleteTask,
  onAddMemo,
}) => {
  const pinnedTasks = tasks.filter((task) => task.pinned);
  const normalTasks = tasks.filter((task) => !task.pinned);

  return (
    <div className="p-4 ml-8 mr-8 overflow-y-auto max-h-[400px] scrollable-div">
      {tasks.length > 0 ? (
        <>
          {pinnedTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onComplete={(id, updatedStatus) =>
                onToggleComplete(id, updatedStatus)
              }
              onPin={(id) => onTogglePin(id, !task.pinned)}
              onDelete={(id) => onDeleteTask(id)}
              onAddMemo={(id, memo) => onAddMemo(id, memo)}
            />
          ))}
          <div className="border-t border-gray-600 my-4" />
          {normalTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onComplete={(id, updatedStatus) =>
                onToggleComplete(id, updatedStatus)
              }
              onPin={(id) => onTogglePin(id, !task.pinned)}
              onDelete={(id) => onDeleteTask(id)}
              onAddMemo={(id, memo) => onAddMemo(id, memo)}
            />
          ))}
        </>
      ) : (
        <div className="text-center text-gray-400 mt-4 mb-4">
          No tasks for this day
        </div>
      )}
    </div>
  );
};

export default memo(TaskList);
