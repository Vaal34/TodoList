import { Button } from "@/components/ui/button";
import { SquareX } from "lucide-react";
import { Category, Task } from "@prisma/client";
import {
  SelectGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useDeleteTask } from "@/hooks/useData";

export function DeleteTasks({
  taches,
  categories,
}: {
  taches: Task[];
  categories: Category[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const deleteTaskMutation = useDeleteTask();

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const filteredTasks = taches.filter(
    (tache) => tache.categoryId === selectedCategory,
  );

  return (
    <div>
      <Select onValueChange={handleSelect}>
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
              disabled={deleteTaskMutation.isPending}
              className="w-full overflow-hidden flex items-center justify-between gap-2 hover:bg-red-500 transition-all duration-400 hover:animate-tilt-shake"
            >
              <span className="truncate">{tache.title}</span>
              <SquareX
                className={deleteTaskMutation.isPending ? "animate-spin" : ""}
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
