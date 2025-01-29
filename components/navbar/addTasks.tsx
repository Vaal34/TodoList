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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CirclePlus } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useEffect, useState, useCallback } from "react";
import { getCategory } from "@/lib/bdd_orm/categoryServices";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { addTask } from "@/lib/bdd_orm/tasksService";
import { useMediaQuery } from "@react-hook/media-query";
import { Session } from "next-auth";

const IMPORTANCE_LEVELS = {
  FAIBLE: "FAIBLE",
  MOYEN: "MOYEN",
  FORT: "FORT",
} as const;

interface AddTasksProps {
  session: Session;
  onDataAdded: () => void;
}

const TaskForm = ({
  handleSubmit,
  title,
  setTitle,
  selectedCategory,
  setSelectedCategory,
  selectedImportance,
  setSelectedImportance,
  categories,
}: {
  handleSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedImportance: keyof typeof IMPORTANCE_LEVELS;
  setSelectedImportance: (value: keyof typeof IMPORTANCE_LEVELS) => void;
  categories: Category[];
}) => (
  <form onSubmit={handleSubmit} className="grid gap-4">
    <div className="grid items-start grid-cols-4 gap-4">
      <Label className="text-right text-sm font-semibold pt-2" htmlFor="title">
        Titre
      </Label>
      <div className="col-span-3">
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entrer le titre de la tâche"
        />
      </div>
      <Label
        className="text-right text-sm font-semibold pt-2"
        htmlFor="category"
      >
        Catégorie
      </Label>
      <div className="col-span-3">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="flex items-center justify-between w-full p-2 border rounded-lg">
            <SelectValue placeholder="Choisir une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.emoji} {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Label
        className="text-right text-sm font-semibold pt-2"
        htmlFor="importance"
      >
        Importance
      </Label>
      <div className="col-span-3">
        <Select
          value={selectedImportance}
          onValueChange={(value) =>
            setSelectedImportance(value as keyof typeof IMPORTANCE_LEVELS)
          }
        >
          <SelectTrigger className="flex items-center justify-between w-full p-2 border rounded-lg">
            <SelectValue placeholder="Choisir l'importance" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(IMPORTANCE_LEVELS).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
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

export function AddTasks({ session, onDataAdded }: AddTasksProps) {
  const [task, setTask] = useState("");
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImportance, setSelectedImportance] =
    useState<keyof typeof IMPORTANCE_LEVELS>("FAIBLE");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const fetchCategories = useCallback(async () => {
    if (session?.user?.id) {
      const categories = await getCategory(session.user.id);
      setCategories(categories);
    }
  }, [session]);

  // Refresh categories when modal opens
  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open, fetchCategories]);

  // Initial fetch
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
      console.error(error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

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
            <DialogDescription>
              Veuillez remplir le formulaire ci-dessous pour ajouter une tâche.
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            handleSubmit={handleSubmit}
            title={task}
            setTitle={setTask}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedImportance={selectedImportance}
            setSelectedImportance={setSelectedImportance}
            categories={categories}
          />
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
          <DialogDescription>
            Veuillez remplir le formulaire ci-dessous pour ajouter une tâche.
          </DialogDescription>
        </DrawerHeader>
        <TaskForm
          handleSubmit={handleSubmit}
          title={task}
          setTitle={setTask}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedImportance={selectedImportance}
          setSelectedImportance={setSelectedImportance}
          categories={categories}
        />
      </DrawerContent>
    </Drawer>
  );
}
