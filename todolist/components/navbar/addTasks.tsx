import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { getCategory } from "@/lib/bdd_orm/categoryServices";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@prisma/client";
import { addTask } from "@/lib/bdd_orm/tasksService";
import { on } from "events";

const IMPORTANCE_LEVELS = {
  FAIBLE: "FAIBLE",
  MOYEN: "MOYEN",
  FORT: "FORT"
} as const;

export function AddTasks({ session, onDataAdded }: { session: any, onDataAdded: () => void }) {
    const [task, setTask] = useState("");
    const [open, setOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedImportance, setSelectedImportance] = useState<keyof typeof IMPORTANCE_LEVELS>("FAIBLE")


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim() === "") {
            alert("Veuillez entrer un nom de catégorie.");
            return;
        }
        try {
            const userId = session?.user.id;
            if (!userId) {
                alert("Utilisateur non authentifié.");
                return;
            }

            // Ajouter la catégorie dans la base de données
            await addTask(task, userId, selectedCategory, selectedImportance);

            // Fermer le modal et rafraîchir les catégories
            setTask("");
            setOpen(false);
            onDataAdded(); // Appelle la fonction pour rafraîchir
        } catch (error) {
            alert("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategory(session?.user?.id)
            setCategories(categories)
        }
        fetchCategories()
    }, [session, onDataAdded])

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <SidebarMenuButton>
                    <span>Ajouter une tâches</span>
                    <CirclePlus className="ml-auto" />
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Ajouter une tâches
                    </DialogTitle>
                    <DialogDescription className="text-sm font-extralight">
                        Veuillez remplir le formulaire ci-dessous pour ajouter une tâche.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid items-start grid-cols-4 gap-4 py-4">
                        <Label
                            className="text-right text-zinc-800 text-sm font-semibold pt-2"
                            htmlFor="title"
                        >
                            Titre
                        </Label>
                        <Input
                            id="title"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="titre de la tâche"
                            className="col-span-3"
                        />

                        <Label
                            className="text-right text-zinc-800 text-sm font-semibold pt-2"
                            htmlFor="category"
                        >
                            Catégorie
                        </Label>
                        <div className="col-span-3">
                            <Select
                                value={selectedCategory}
                                onValueChange={setSelectedCategory}
                            >
                                <SelectTrigger className="flex items-center justify-between w-full p-2 border rounded-lg">
                                    <SelectValue placeholder="Choisir une catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Label
                            className="text-right text-zinc-800 text-sm font-semibold pt-2"
                            htmlFor="importance"
                        >
                            Importance
                        </Label>
                        <div className="col-span-3">
                            <Select
                                value={selectedImportance}
                                onValueChange={(value) => setSelectedImportance(value as keyof typeof IMPORTANCE_LEVELS)}
                            >
                                <SelectTrigger className="flex items-center justify-between w-full p-2 border rounded-lg">
                                    <SelectValue placeholder="Choisir l'importance" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(IMPORTANCE_LEVELS).map(([key, value]) => (
                                        <SelectItem
                                            key={key}
                                            value={key}
                                        >
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">
                            Ajouter
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}