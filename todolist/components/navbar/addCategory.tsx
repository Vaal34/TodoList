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
import { FolderPlus } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useState } from "react";
import { addCategory } from "@/lib/bdd_orm/categoryServices";

export function AddCategory({ session, onDataAdded }: { session: any, onDataAdded: () => void }) {
    const [categoryName, setCategoryName] = useState("");
    const [open, setOpen] = useState(false)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (categoryName.trim() === "") {
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
            await addCategory(categoryName, userId);

            // Fermer le modal et rafraîchir les catégories
            setCategoryName("");
            setOpen(false);
            onDataAdded(); // Appelle la fonction pour rafraîchir
        } catch (error) {
            alert("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <SidebarMenuButton>
                    <span>Ajouter une catégorie</span>
                    <FolderPlus className="ml-auto" />
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            Ajouter une catégorie
                        </DialogTitle>
                        <DialogDescription className="text-sm font-extralight">
                            Veuillez choisir un nom pour ajouter une catégorie
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid items-center grid-cols-4 gap-4 py-4">
                            <Label
                                className="text-right text-sm font-semibold"
                                htmlFor="name"
                            >
                                Nom
                            </Label>
                            <Input
                                id="name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="nom de la catégorie"
                                className="col-span-3"
                            />
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