import React, { useState } from "react";

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim()) {
      onAddTask(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="p-4 ml-8 mr-8">
      <input
        type="text"
        className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        placeholder="Add a task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
      />
    </div>
  );
};

export default TaskInput;
