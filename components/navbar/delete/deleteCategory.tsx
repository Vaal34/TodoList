import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "@/hooks/useData";
import { Category } from "@prisma/client";
import { SquareX } from "lucide-react";
import { useState } from "react";

export function DeleteCategory({ categories }: { categories: Category[] }) {
  const deleteCategoryMutation = useDeleteCategory();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (categoryId: string) => {
    try {
      setDeletingId(categoryId);
      await deleteCategoryMutation.mutateAsync(categoryId);
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 p-2">
      {categories.map((categorie) => (
        <Button
          onClick={() => handleDelete(categorie.id)}
          key={categorie.id}
          disabled={deletingId === categorie.id}
          className="duration-400 flex items-center justify-between truncate transition-all hover:animate-tilt-shake hover:bg-red-500"
        >
          <span className="overflow-auto truncate">
            {categorie.emoji + categorie.name}
          </span>
          <SquareX
            className={deletingId === categorie.id ? "animate-spin" : ""}
          />
        </Button>
      ))}
    </div>
  );
}
