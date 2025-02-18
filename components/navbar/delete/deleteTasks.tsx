import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDeleteTask } from "@/hooks/useData";
import { Category, Task } from "@prisma/client";
import { SquareX } from "lucide-react";
import { useState } from "react";

export function DeleteTasks({
  taches,
  categories,
}: {
  taches: Task[];
  categories: Category[];
}) {
  const deleteTaskMutation = useDeleteTask();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
  };

  const handleDelete = async (taskId: string) => {
    try {
      setDeletingId(taskId);
      await deleteTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTasks = taches.filter(
    (tache) => tache.categoryId === selectedCategory
  );

  return (
    <div className="flex flex-col gap-2">
      <Select onValueChange={handleSelect} value={selectedCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Selectionnez une catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((categorie) => (
              <SelectItem key={categorie.id} value={categorie.id}>
                {categorie.emoji} {categorie.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedCategory && filteredTasks.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 p-2">
          {filteredTasks.map((tache) => (
            <Button
              key={tache.id}
              onClick={() => handleDelete(tache.id)}
              disabled={deletingId === tache.id}
              className="duration-400 flex w-full items-center justify-between gap-2 overflow-hidden transition-all hover:animate-tilt-shake hover:bg-red-500"
            >
              <span className="truncate">{tache.title}</span>
              <SquareX
                className={deletingId === tache.id ? "animate-spin" : ""}
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
