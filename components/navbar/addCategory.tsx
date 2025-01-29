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
import { useMediaQuery } from "@react-hook/media-query";
import EmojiPicker from "emoji-picker-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";

interface AddCategoryProps {
  session: Session;
  onDataAdded: () => void;
}

export function AddCategory({ session, onDataAdded }: AddCategoryProps) {
  const [categoryName, setCategoryName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
      // Ajouter la catégorie avec l'emoji dans la base de données
      await addCategory(categoryName, userId, selectedEmoji);

      // Fermer le modal et rafraîchir les catégories
      setCategoryName("");
      setSelectedEmoji("");
      setOpen(false);
      onDataAdded();
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <SidebarMenuButton tooltip="Ajouter une catégorie">
            <FolderPlus />
            <span>Ajouter une tâches</span>
          </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une catégorie</DialogTitle>
            <DialogDescription>
              Veuillez choisir un nom et une icône pour la catégorie
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            handleSubmit={handleSubmit}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            selectedEmoji={selectedEmoji}
            setSelectedEmoji={setSelectedEmoji}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <SidebarMenuButton tooltip="Ajouter une catégorie">
          <FolderPlus />
          <span>Ajouter une catégorie</span>
        </SidebarMenuButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Ajouter une catégorie</DrawerTitle>
          <DialogDescription>
            Veuillez choisir un nom et une icône pour la catégorie
          </DialogDescription>
        </DrawerHeader>
        <CategoryForm
          className="px-4"
          handleSubmit={handleSubmit}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          selectedEmoji={selectedEmoji}
          setSelectedEmoji={setSelectedEmoji}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
        />
      </DrawerContent>
    </Drawer>
  );
}

function CategoryForm({
  className,
  handleSubmit,
  categoryName,
  setCategoryName,
  selectedEmoji,
  setSelectedEmoji,
  showEmojiPicker,
  setShowEmojiPicker,
}: {
  className?: string;
  handleSubmit: (e: React.FormEvent) => void;
  categoryName: string;
  setCategoryName: (name: string) => void;
  selectedEmoji: string;
  setSelectedEmoji: (emoji: string) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
}) {
  return (
    <form onSubmit={handleSubmit} className={cn("grid gap-4", className)}>
      <div className="grid items-center grid-cols-4 gap-4">
        <Label className="text-right text-sm font-semibold">Nom</Label>
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Nom de la catégorie"
          className="col-span-3"
        />

        <Label className="text-right text-sm font-semibold">Emoji</Label>
        <div className="col-span-3">
          <Button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            {selectedEmoji || "Choisir un emoji"}
          </Button>
          {showEmojiPicker && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  setSelectedEmoji(emoji.emoji);
                  setShowEmojiPicker(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <DialogFooter className="pb-4 md:pb-0">
        <Button type="submit">Ajouter</Button>
      </DialogFooter>
    </form>
  );
}
