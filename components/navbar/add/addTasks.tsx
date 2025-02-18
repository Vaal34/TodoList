import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useAddTask, useCategories } from "@/hooks/useData";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useMediaQuery } from "@react-hook/media-query";
import { CirclePlus } from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";

const IMPORTANCE_LEVELS = {
  FAIBLE: "FAIBLE",
  MOYEN: "MOYEN",
  FORT: "FORT",
} as const;

interface AddTasksProps {
  session: Session;
}

const TaskForm = ({
  className,
  handleSubmit,
  title,
  setTask,
  selectedCategory,
  setSelectedCategory,
  selectedImportance,
  setSelectedImportance,
  categories,
  isLoading,
  setErrorForm,
}: {
  className?: string;
  handleSubmit: (e: React.FormEvent) => void;
  title: string;
  setTask: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedImportance: keyof typeof IMPORTANCE_LEVELS;
  setSelectedImportance: (value: keyof typeof IMPORTANCE_LEVELS) => void;
  categories: Category[];
  isLoading: boolean;
  setErrorForm: (value: string) => void;
}) => (
  <form onSubmit={handleSubmit} className={cn("grid gap-4", className)}>
    <div className="grid grid-cols-4 items-start gap-4">
      <Label className="pt-2 text-right text-sm font-semibold" htmlFor="title">
        Titre
      </Label>
      <div className="col-span-3">
        <Input
          id="title"
          value={title}
          onChange={(e) => {
            setTask(e.target.value);
            if (e.target.value.trim() !== "") {
              setErrorForm("");
            }
          }}
          placeholder="Entrer le titre de la tâche"
          disabled={isLoading}
        />
      </div>
      <Label
        className="pt-2 text-right text-sm font-semibold"
        htmlFor="category"
      >
        Catégorie
      </Label>
      <div className="col-span-3">
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          disabled={isLoading}
        >
          <SelectTrigger className="flex w-full items-center justify-between rounded-lg border p-2">
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
        className="pt-2 text-right text-sm font-semibold"
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
          disabled={isLoading}
        >
          <SelectTrigger className="flex w-full items-center justify-between rounded-lg border p-2">
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
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Ajout en cours..." : "Ajouter"}
      </Button>
    </DialogFooter>
  </form>
);

export function AddTasks({ session }: AddTasksProps) {
  const [task, setTask] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errorForm, setErrorForm] = useState<string>("");
  const [selectedImportance, setSelectedImportance] =
    useState<keyof typeof IMPORTANCE_LEVELS>("FAIBLE");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Utilisation des hooks React Query
  const addTaskMutation = useAddTask();
  const { data: categories = [] } = useCategories(session?.user?.id ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() === "" || !selectedCategory) {
      setErrorForm("Merci de remplir tous les champs.");
      return;
    }

    setErrorForm("");

    try {
      await addTaskMutation.mutateAsync({
        title: task,
        userId: session.user.id,
        category: selectedCategory,
        importance: selectedImportance,
      });

      setTask("");
      setSelectedCategory("");
      setSelectedImportance("FAIBLE");
      setOpen(false);
    } catch (error) {
      console.error(error);
      setErrorForm("Une erreur est survenue lors de l'ajout de la tâche");
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
          {errorForm && <p className="text-red-600">{errorForm}</p>}
          <TaskForm
            handleSubmit={handleSubmit}
            title={task}
            setTask={setTask}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedImportance={selectedImportance}
            setSelectedImportance={setSelectedImportance}
            categories={categories}
            isLoading={addTaskMutation.isPending}
            setErrorForm={setErrorForm}
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
        {errorForm && (
          <p className="pb-4 text-center text-red-600">{errorForm}</p>
        )}
        <TaskForm
          className="px-4"
          handleSubmit={handleSubmit}
          title={task}
          setTask={setTask}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedImportance={selectedImportance}
          setSelectedImportance={setSelectedImportance}
          categories={categories}
          isLoading={addTaskMutation.isPending}
          setErrorForm={setErrorForm}
        />
      </DrawerContent>
    </Drawer>
  );
}
