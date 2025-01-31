import { Button } from "@/components/ui/button";
import { SquareX } from "lucide-react";
import { Category } from "@prisma/client";
import { useDeleteCategory } from "@/hooks/useData";

export function DeleteCategory({ categories }: { categories: Category[] }) {
  const deleteCategoryMutation = useDeleteCategory();

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 p-2">
      {categories.map((categorie) => (
        <Button
          onClick={() => handleDelete(categorie.id)}
          key={categorie.id}
          disabled={deleteCategoryMutation.isPending}
          className="truncate flex items-center justify-between hover:bg-red-500 transition-all duration-400 hover:animate-tilt-shake"
        >
          <span className="truncate overflow-auto">
            {categorie.emoji + categorie.name}
          </span>
          <SquareX
            className={deleteCategoryMutation.isPending ? "animate-spin" : ""}
          />
        </Button>
      ))}
    </div>
  );
}
