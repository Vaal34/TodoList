"use client";

import { TaskList } from "@/components/homeTasks/taskList";
import { Searchbar } from "@/components/ui/searchbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories, useDeleteTask, useTasks } from "@/hooks/useData";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const { data: categories } = useCategories(session?.user?.id ?? "");
  const { data: taches } = useTasks(session?.user?.id ?? "");
  const deleteTaskMutation = useDeleteTask();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>("");

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const tasksWithCategories = taches?.map((tache) => {
    const category = categories?.find((cat) => cat.id === tache.categoryId);
    return {
      ...tache,
      categoryName: category?.name ?? "",
      categoryEmoji: category?.emoji ?? "",
    };
  });

  const filteredTasks =
    selectedCategory === "all" || !selectedCategory
      ? tasksWithCategories
      : tasksWithCategories?.filter(
          (task) => task.categoryId === selectedCategory
        );

  const searchTasks = filteredTasks?.filter((task) =>
    task.title.toLowerCase().startsWith(inputText.toLowerCase())
  );

  return (
    <div className="flex size-full flex-col items-center gap-4 p-11 transition-all md:p-16">
      <div className="flex w-full flex-row gap-2">
        <Searchbar
          value={inputText}
          onChange={(e) => setInputText((e.target as HTMLInputElement).value)}
          className="w-1/2 md:w-3/4"
        />
        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger className="md:1/4 flex w-1/2 items-center justify-between truncate rounded-lg border p-2 text-xs md:text-sm">
            <SelectValue placeholder="Choisir une catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les tâches</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.emoji} {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <TaskList tasks={searchTasks || []} onDelete={handleDelete} />
    </div>
  );
}
