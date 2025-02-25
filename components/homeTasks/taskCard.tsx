"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import tailwindConfig from "@/tailwind.config";
import { SquareCheck } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    createdAt: Date;
    categoryEmoji: string;
    categoryName: string;
    importance: string;
  };
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const ImportanceColors: Record<
    string,
    { color: string; dot: string; border: string }
  > = {
    FORT: {
      color: tailwindConfig.theme.extend.colors.fort,
      dot: "bg-fort",
      border: "border-fort",
    },
    MOYEN: {
      color: tailwindConfig.theme.extend.colors.moyen,
      dot: "bg-moyen",
      border: "border-moyen",
    },
    FAIBLE: {
      color: tailwindConfig.theme.extend.colors.faible,
      dot: "bg-faible",
      border: "border-faible",
    },
  };

  return (
    <Card className={`flex flex-col justify-between text-xs md:text-base`}>
      <CardHeader className="p-2 sm:p-3 md:p-6">
        <CardTitle className="flex w-full items-center justify-between gap-1 sm:gap-2">
          <span
            className={`mb-auto mt-0.5 h-2 w-2 flex-none rounded-full sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 ${ImportanceColors[task.importance].dot}`}
          />
          <span className="mb-auto line-clamp-2 w-3/4 md:w-full">
            {task.title}
          </span>
          <SquareCheck
            onClick={() => onDelete(task.id)}
            className={`active:scale-95 ${
              task.importance === "FORT"
                ? "hover:text-fort"
                : task.importance === "MOYEN"
                  ? "hover:text-moyen"
                  : "hover:text-faible"
            } mb-auto ml-auto size-3 duration-300 hover:scale-110 sm:size-4 md:size-6 hover:${ImportanceColors[task.importance].border}`}
          />
        </CardTitle>
        <CardDescription className="text-[10px] sm:text-xs md:text-sm">
          {task.createdAt.toDateString()}
        </CardDescription>
      </CardHeader>
      <CardFooter className="truncate p-2 text-[10px] sm:p-3 sm:text-xs md:p-6 md:text-sm">
        {task.categoryEmoji + " " + task.categoryName}
      </CardFooter>
    </Card>
  );
}
