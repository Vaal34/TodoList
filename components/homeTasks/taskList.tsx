"use client";

import { TaskCard } from "@/components/homeTasks/taskCard";

interface TaskListProps {
  tasks: {
    id: string;
    title: string;
    createdAt: Date;
    categoryEmoji: string;
    categoryName: string;
    importance: string;
  }[];
  onDelete: (taskId: string) => void;
}

export function TaskList({ tasks, onDelete }: TaskListProps) {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-4 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}
