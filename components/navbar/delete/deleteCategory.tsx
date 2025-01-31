import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SquareX } from "lucide-react";
import { Category } from "@prisma/client";
import { deleteCategory } from "@/lib/bdd_orm/categoryServices";

export function DeleteCategory({ categories: initialCategories }: { categories: Category[] }) {    
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isDeleting, setIsDeleting] = useState<string>("");

    const handleDelete = useCallback(async (id: string) => {
        try {
            setIsDeleting(id);
            await deleteCategory(id);
            setCategories(prev => prev.filter(cat => cat.id !== id));
        } catch (error) {
            console.error("Failed to delete category:", error);
        } finally {
            setIsDeleting("");
        }
    }, []);

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 p-2">
            {categories.map((categorie) => (
                <Button
                    onClick={() => handleDelete(categorie.id)}
                    key={categorie.id}
                    disabled={isDeleting === categorie.id}
                    className="truncate flex items-center justify-between hover:bg-red-500 transition-all duration-400 hover:animate-tilt-shake"
                >
                    <span className="truncate overflow-auto">
                        {categorie.emoji + categorie.name}
                    </span>
                    <SquareX className={isDeleting === categorie.id ? "animate-spin" : ""} />
                </Button>
            ))}
        </div>
    )
}