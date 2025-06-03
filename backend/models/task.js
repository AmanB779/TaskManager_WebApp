import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      trim: true,
      required: true,
      default: "medium",
      enum: ["low", "medium", "high", "urgent"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["started", "pending", "completed", "cancelled", "archived"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
