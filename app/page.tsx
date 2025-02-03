"use client";

import { Searchbar } from "@/components/ui/searchbar";
import { useCategories, useDeleteTask, useTasks } from "@/hooks/useData";
import { useSession } from "next-auth/react";
import { TaskList } from "@/components/homeTasks/taskList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const { data: categories } = useCategories(session?.user?.id ?? "");
  const { data: taches } = useTasks(session?.user?.id ?? "");
  const deleteTaskMutation = useDeleteTask();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>("")

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const tasksWithCategories = taches?.map(tache => {
    const category = categories?.find(cat => cat.id === tache.categoryId);
    return {
      ...tache,
      categoryName: category?.name ?? '',
      categoryEmoji: category?.emoji ?? ''
    };
  });

  const filteredTasks = selectedCategory === "all" || !selectedCategory
    ? tasksWithCategories
    : tasksWithCategories?.filter(task => task.categoryId === selectedCategory);

  const searchTasks = filteredTasks?.filter(task =>
    task.title.toLowerCase().startsWith((inputText).toLowerCase())
  );


  return (
    <div className="size-full flex flex-col items-center p-11 md:p-16 gap-4 transition-all">
      <div className="flex gap-2 w-full flex-row">
        <Searchbar
          value={inputText} onChange={(e) => setInputText((e.target as HTMLInputElement).value)}
          className="md:w-3/4 w-1/2" />
        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger className="text-xs md:text-sm truncate w-1/2 md:1/4 flex items-center justify-between p-2 border rounded-lg">
            <SelectValue placeholder="Choisir une catégorie" />
          </SelectTrigger>
          <SelectContent >
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