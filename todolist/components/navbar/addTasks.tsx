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
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { CirclePlus } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { getCategory } from "@/lib/bdd_orm/categoryServices";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@prisma/client";
import { addTask } from "@/lib/bdd_orm/tasksService";
import { useMediaQuery } from "@react-hook/media-query";
import { cn } from "@/lib/utils";

const IMPORTANCE_LEVELS = {
  FAIBLE: "FAIBLE",
  MOYEN: "MOYEN",
  FORT: "FORT"
} as const;

export function AddTasks({ session, onDataAdded }: { session: any, onDataAdded: () => void }) {
    const [task, setTask] = useState("");
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedImportance, setSelectedImportance] = useState<keyof typeof IMPORTANCE_LEVELS>("FAIBLE");
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim() === "") {
            alert("Veuillez entrer un titre de tâche.");
            return;
        }
        try {
            const userId = session?.user.id;
            if (!userId) {
                alert("Utilisateur non authentifié.");
                return;
            }
            await addTask(task, userId, selectedCategory, selectedImportance);
            setTask("");
            setOpen(false);
            onDataAdded();
        } catch (error) {
            alert("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategory(session?.user?.id);
            setCategories(categories);
        };
        fetchCategories();
    }, [session, onDataAdded]);

    const TaskForm = ({ className }: { className?: string }) => (
        <form onSubmit={handleSubmit} className={cn("grid gap-4", className)}>
            <div className="grid items-start grid-cols-4 gap-4">
                <Label className="text-right text-sm font-semibold pt-2" htmlFor="title">Titre</Label>
                <Input id="title" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Titre de la tâche" className="col-span-3" />

                <Label className="text-right text-sm font-semibold pt-2" htmlFor="category">Catégorie</Label>
                <div className="col-span-3">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="flex items-center justify-between w-full p-2 border rounded-lg">
                            <SelectValue placeholder="Choisir une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Label className="text-right text-sm font-semibold pt-2" htmlFor="importance">Importance</Label>
                <div className="col-span-3">
                    <Select value={selectedImportance} onValueChange={(value) => setSelectedImportance(value as keyof typeof IMPORTANCE_LEVELS)}>
                        <SelectTrigger className="flex items-center justify-between w-full p-2 border rounded-lg">
                            <SelectValue placeholder="Choisir l'importance" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(IMPORTANCE_LEVELS).map(([key, value]) => (
                                <SelectItem key={key} value={key}>{value}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter className="pb-4 md:pb-0">
                <Button type="submit">Ajouter</Button>
            </DialogFooter>
        </form>
    );

    if (isDesktop) {
        return (
            <Dialog onOpenChange={setOpen} open={open}>
                <DialogTrigger asChild>
                    <SidebarMenuButton tooltip="Ajouter une tâche">
                        <CirclePlus />
                        <span>Ajouter une tâche</span>
                    </SidebarMenuButton>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter une tâche</DialogTitle>
                        <DialogDescription>Veuillez remplir le formulaire ci-dessous pour ajouter une tâche.</DialogDescription>
                    </DialogHeader>
                    <TaskForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <SidebarMenuButton tooltip="Ajouter une tâche">
                    <CirclePlus />
                    <span>Ajouter une tâche</span>
                </SidebarMenuButton>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Ajouter une tâche</DrawerTitle>
                    <DialogDescription>Veuillez remplir le formulaire ci-dessous pour ajouter une tâche.</DialogDescription>
                </DrawerHeader>
                <TaskForm className="px-4" />
            </DrawerContent>
        </Drawer>
    );
}
