"use client";

import { CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { SquareCheck } from "lucide-react";
import { useTheme } from "next-themes";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    createdAt: Date;
    categoryEmoji: string;
    categoryName: string;
  };
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const { theme } = useTheme();

  return (
    <MagicCard gradientColor={theme === "dark" ? "#111211" : "D9D9D955"} gradientOpacity={0.8} key={task.id}
      className="flex justify-between flex-col"
    >
      <CardHeader className="p-3 md:p-6">
        <CardTitle className="text-xs md:text-sm flex items-center justify-between gap-2 w-full">
          <span className="mb-auto w-3/4 md:w-full">{task.title}</span>
          <SquareCheck
            onClick={() => onDelete(task.id)}
            className="size-4 md:size-6 ml-auto mb-auto hover:scale-110 hover:text-green-500 cursor-pointer transition-all duration-200"
          />
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">{task.createdAt.toDateString()}</CardDescription>
      </CardHeader>
      <CardFooter className="truncate text-xs md:text-sm p-3 md:p-6">{task.categoryEmoji + " " + task.categoryName}</CardFooter>
    </MagicCard>
  );
}