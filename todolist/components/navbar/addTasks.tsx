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
} from "@radix-ui/react-dialog";
import { CirclePlus, FolderPlus } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useState } from "react";
import { addCategory } from "@/lib/bdd_orm/categoryServices";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";

export function AddTasks({ session }: { session: any }) {
    const [task, setTask] = useState("");
    const [open, setOpen] = useState(false)


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
            await addCategory(task, userId);

            // Fermer le modal et rafraîchir les catégories
            setTask("");
            setOpen(false);
            onCategoryAdded(); // Appelle la fonction pour rafraîchir
        } catch (error) {
            alert("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <SidebarMenuButton>
                    <span>Ajouter une tâches</span>
                    <CirclePlus className="ml-auto" />
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="fixed inset-0 flex flex-col items-center justify-center p-4">
                <div className="bg-zinc-900 p-6 rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-zinc-200 font-bold">
                            Ajouter une tâches
                        </DialogTitle>
                        <DialogDescription className="text-sm font-extralight text-zinc-100">
                            Veuillez remplur le formulaire ci-dessous pour ajouter une tâche.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid items-center grid-cols-4 gap-4 py-4">
                            <Label
                                className="text-right text-zinc-200 text-sm font-semibold"
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
                                className="text-right text-zinc-200 text-sm font-semibold"
                                htmlFor="description"
                            >
                                Description
                            </Label>
                            <Input
                                id="description"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                placeholder="description de la tâche"
                                className="col-span-3"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" variant="outline">
                                Ajouter
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}