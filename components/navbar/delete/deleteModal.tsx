import { Trash } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
  DialogTrigger,
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Session } from "next-auth";
import { useState } from "react";
import { DeleteCategory } from "./deleteCategory";
import { DeleteTasks } from "./deleteTasks";
import { useCategories, useTasks } from "@/hooks/useData";

interface DeleteItemProps {
  session: Session;
}

export function DeleteItem({ session }: DeleteItemProps) {
  const [open, setOpen] = useState(false);
  const [isTasks, setIsTasks] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data: categories = [] } = useCategories(session?.user?.id ?? "");
  const { data: tasks = [] } = useTasks(session?.user?.id ?? "");

  const content = (
    <>
      <div className="flex items-center justify-center space-x-2">
        <Label htmlFor="delete-switch">Catégories</Label>
        <Switch
          id="delete-switch"
          checked={isTasks}
          onCheckedChange={setIsTasks}
        />
        <Label htmlFor="delete-switch">Tâches</Label>
      </div>

      <AnimatePresence mode="wait">
        {isTasks ? (
          <motion.div
            key="tasks"
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "linear",
            }}
            className="overflow-hidden"
          >
            <DeleteTasks taches={tasks} categories={categories} />
          </motion.div>
        ) : (
          <motion.div
            key="categories"
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "linear",
            }}
            className="overflow-hidden"
          >
            <DeleteCategory categories={categories} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <SidebarMenuButton tooltip="Corbeille">
            <Trash />
            <span>Corbeille</span>
          </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer des éléments</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Choississez un élement pour le supprimer.
          </DialogDescription>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <SidebarMenuButton tooltip="Corbeille">
          <Trash />
          <span>Corbeille</span>
        </SidebarMenuButton>
      </DrawerTrigger>
      <DrawerContent className="gap-2 p-4">
        <DrawerHeader>
          <DrawerTitle>Supprimer des éléments</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="text-center">
          Choississez un élement pour le supprimer.
        </DrawerDescription>
        {content}
      </DrawerContent>
    </Drawer>
  );
}
