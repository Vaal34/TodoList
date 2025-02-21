"use client";

import { CardHeader, CardTitle, CardDescription, CardFooter, Card } from "@/components/ui/card";
import { SquareCheck } from "lucide-react";
import tailwindConfig from "@/tailwind.config";

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

  const ImportanceColors: Record<string, { color: string; dot: string, border: string }> = {
    "FORT": {
      color: tailwindConfig.theme.extend.colors.fort,
      dot: "bg-fort",
      border: "border-fort"
    },
    "MOYEN": {
      color: tailwindConfig.theme.extend.colors.moyen,
      dot: "bg-moyen",
      border: "border-moyen"
    },
    "FAIBLE": {
      color: tailwindConfig.theme.extend.colors.faible,
      dot: "bg-faible",
      border: "border-faible"
    }
  };

    return (
      <Card className={`${ImportanceColors[task.importance].border} flex flex-col justify-between text-xs md:text-base`}>
        <CardHeader className="p-2 sm:p-3 md:p-6">
          <CardTitle className="flex items-center justify-between gap-1 sm:gap-2 w-full">
            <span className={`flex-none mt-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full ${ImportanceColors[task.importance].dot}`} />
            <span className="mb-auto w-3/4 md:w-full line-clamp-2">{task.title}</span>
            <SquareCheck
              onClick={() => onDelete(task.id)}
              className={`active:scale-95 
                ${task.importance === 'fort' ? 'hover:text-fort'
                  : task.importance === 'moyen' ? 'hover:text-moyen'
                    : 'hover:text-faible'
                }
                size-3 sm:size-4 md:size-6 ml-auto mb-auto hover:scale-110 duration-300 hover:${ImportanceColors[task.importance].border}`}
            />
          </CardTitle>
          <CardDescription className="text-[10px] sm:text-xs md:text-sm">{task.createdAt.toDateString()}</CardDescription>
        </CardHeader>
        <CardFooter className="truncate p-2 sm:p-3 md:p-6 text-[10px] sm:text-xs md:text-sm">
          {task.categoryEmoji + " " + task.categoryName}
        </CardFooter>
      </Card>
    )
}
