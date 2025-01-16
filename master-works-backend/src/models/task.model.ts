import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  name: string;
  description: string;
  date: Date;
  status: string;
  pinned: boolean;
  memo: string;
}

const TaskSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true },
    status: { type: String, default: "pending" },
    pinned: { type: Boolean, default: false },
    memo: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
