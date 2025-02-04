"use client";

import { CardHeader, CardTitle, CardDescription, CardFooter, Card } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { SquareCheck } from "lucide-react";
import { useTheme } from "next-themes";
import tailwindConfig from "@/tailwind.config";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const { theme } = useTheme();
  const isMobile = useIsMobile();

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

  if (isMobile) {
    return (
      <Card className={`${ImportanceColors[task.importance].border} flex flex-col justify-between`}>
        <CardHeader className="p-3 md:p-6">
          <CardTitle className="text-xs md:text-sm flex items-center justify-between gap-2 w-full">
            <span className={`flex-none mt-0.5 md:mt-1 mb-auto w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${ImportanceColors[task.importance].dot}`} />
            <span className="mb-auto w-3/4 md:w-full">{task.title}</span>
            <SquareCheck
              onClick={() => onDelete(task.id)}
              className={`active:scale-95 
                ${task.importance === 'fort' ? 'hover:text-fort'
                  : task.importance === 'moyen' ? 'hover:text-moyen'
                    : 'hover:text-faible'
                }
                   size-4 md:size-6 ml-auto mb-auto hover:scale-110 duration-300 hover:${ImportanceColors[task.importance].border}`}
            />
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">{task.createdAt.toDateString()}</CardDescription>
        </CardHeader>
        <CardFooter className="truncate text-xs md:text-sm p-3 md:p-6">
          {task.categoryEmoji + " " + task.categoryName}
        </CardFooter>
      </Card>
    )
  }

  return (
    <MagicCard
      gradientColor={theme === "dark" ? "#09090B" : "#fefefe"}
      gradientOpacity={0.8}
      key={task.id}
      className="flex justify-between flex-col"
      gradientTo={ImportanceColors[task.importance].color}
      gradientFrom="#858e96"
    >
      <CardHeader className="p-3 md:p-6">
        <CardTitle className="text-xs md:text-sm flex items-center justify-between gap-2 w-full">
          <span className={`flex-none mt-0.5 md:mt-1 mb-auto w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${ImportanceColors[task.importance].dot}`} />
          <span className="mb-auto w-3/4 md:w-full">{task.title}</span>
          <SquareCheck
            onClick={() => onDelete(task.id)}
            className={`active:scale-95 
                ${task.importance === 'FORT' ? 'hover:text-fort'
                : task.importance === 'MOYEN' ? 'hover:text-moyen'
                  : 'hover:text-faible'
              }
                   size-4 md:size-6 ml-auto mb-auto hover:scale-110 duration-200 hover:${ImportanceColors[task.importance].border}`}
          />
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">{task.createdAt.toDateString()}</CardDescription>
      </CardHeader>
      <CardFooter className="truncate text-xs md:text-sm p-3 md:p-6">
        {task.categoryEmoji + " " + task.categoryName}
      </CardFooter>
    </MagicCard>
  );
}
