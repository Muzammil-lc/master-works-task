import React, { useState, useCallback, memo } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  TextField,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PushPinIcon from "@mui/icons-material/PushPin";

export interface Task {
  id: string;
  name: string;
  status: string;
  pinned: boolean;
  memo?: string;
}

interface TaskItemProps {
  task: Task;
  onComplete: (id: string, updatedStatus: string) => void;
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
  onAddMemo: (id: string, memo: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onComplete,
  onPin,
  onDelete,
  onAddMemo,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMemoDialog, setOpenMemoDialog] = useState(false);
  const [memoText, setMemoText] = useState(task.memo || "");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleComplete = () => {
    const id = task?._id;
    const updatedStatus = task.status === "completed" ? "pending" : "completed";
    onComplete(id, updatedStatus);
  };

  const handlePin = () => onPin(task?._id);
  const handleDelete = () => onDelete(task?._id);

  const handleAddMemo = () => {
    onAddMemo(task?._id, memoText);
    setOpenMemoDialog(false);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-gray-700 rounded-lg p-2 mb-2">
        <div className="flex flex-col">
          <div className="flex items-center">
            {task.pinned && <PushPinIcon className="text-pink-400 mr-2" />}
            <input
              type="checkbox"
              checked={task.status === "completed"}
              onChange={handleComplete}
              className="mr-2"
            />
            <div className="flex flex-col">
              <span
                className={`text-white ${
                  task.status === "completed"
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {task.name}
              </span>
              {/* Memo */}
              {task.memo && (
                <span className="text-sm text-gray-400 mt-1">{task.memo}</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <IconButton onClick={handleMenuOpen} className="text-white">
            <MoreHorizIcon style={{ color: "white" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: { backgroundColor: "#333", color: "#fff", width: "200px" },
            }}
          >
            <MenuItem
              onClick={() => {
                handlePin();
                handleMenuClose();
              }}
            >
              {task.pinned ? "Unpin" : "Pin to top"}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenMemoDialog(true);
                handleMenuClose();
              }}
            >
              Add Memo
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDelete();
                handleMenuClose();
              }}
              style={{ color: "red" }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>

      <Dialog open={openMemoDialog} onClose={() => setOpenMemoDialog(false)}>
        <div className="p-4">
          <TextField
            label="Memo"
            fullWidth
            value={memoText}
            onChange={(e) => setMemoText(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <Button onClick={() => setOpenMemoDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddMemo} color="primary">
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default memo(TaskItem);
