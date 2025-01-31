import { Delete, DeleteIcon, SquareX, Trash } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { DialogTrigger, Dialog, DialogTitle, DialogHeader, DialogContent, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/lib/bdd_orm/categoryServices";
import { useCallback, useEffect, useState } from "react";
import { Session } from "next-auth";
import { Category, Task } from "@prisma/client";
import { DeleteCategory } from "./deleteCategory";
import { getTask } from "@/lib/bdd_orm/tasksService";
import { fetchData } from "next-auth/client/_utils";
import { DeleteTasks } from "./deleteTasks";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"
import { AnimatePresence, motion } from "framer-motion"
import { useMediaQuery } from "@react-hook/media-query";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

interface DeleteItemProps {
    session: Session
}

export function DeleteItem({ session }: DeleteItemProps) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([])
    const [taches, setTaches] = useState<Task[]>([])
    const [isTasks, setIsTasks] = useState(true)
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const fetchData = useCallback(async () => {
        if (session?.user?.id) {
            const categories = await getCategory(session.user.id);
            const taches = await getTask(session.user.id)
            setCategories(categories);
            setTaches(taches)
        }
    }, [session]);

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open, fetchData]);

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
                    <DialogDescription>Choississez un élement pour le supprimer.</DialogDescription>

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
                                    ease: "linear"
                                }}
                                className="overflow-hidden"
                            >
                                <DeleteTasks taches={taches} categories={categories} />
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
                                    ease: "linear"
                                }}
                                className="overflow-hidden"
                            >
                                <DeleteCategory categories={categories} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        )
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
                <DrawerDescription className="text-center">Choississez un élement pour le supprimer.</DrawerDescription>

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
                                ease: "linear"
                            }}
                            className="overflow-hidden"
                        >
                            <DeleteTasks taches={taches} categories={categories} />
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
                                ease: "linear"
                            }}
                            className="overflow-hidden"
                        >
                            <DeleteCategory categories={categories} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </DrawerContent>
        </Drawer>
    )
} 