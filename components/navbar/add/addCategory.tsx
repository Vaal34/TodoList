import { DialogFooter, DialogHeader } from "../../ui/dialog";
import { Button } from "../../ui/button";
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
import { useAddCategory } from "@/hooks/useData";

interface AddCategoryProps {
  session: Session;
}

export function AddCategory({ session }: AddCategoryProps) {
  const [categoryName, setCategoryName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorForm, setErrorForm] = useState<string>("")
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const addCategoryMutation = useAddCategory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim() === "" || !selectedEmoji) {
      setErrorForm("Veuillez remplir tous les champs")
      return;
    }
    try {
      await addCategoryMutation.mutateAsync({
        name: categoryName,
        userId: session.user.id,
        emoji: selectedEmoji,
      });

      setCategoryName("");
      setSelectedEmoji("");
      setOpen(false);
    } catch (error) {
      console.error(error);
      setErrorForm("Une erreur est survenue lors de l'ajout de la catégorie");
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <SidebarMenuButton tooltip="Ajouter une catégorie">
            <FolderPlus />
            <span>Ajouter une catégorie</span>
          </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une catégorie</DialogTitle>
            <DialogDescription>
              Veuillez choisir un nom et une icône pour la catégorie
            </DialogDescription>
          </DialogHeader>
          {errorForm && (
          <p className="text-red-600">{errorForm}</p>
        )}
          <CategoryForm
            handleSubmit={handleSubmit}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            selectedEmoji={selectedEmoji}
            setSelectedEmoji={setSelectedEmoji}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            isLoading={addCategoryMutation.isPending}
            setErrorForm={setErrorForm}
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
        {errorForm && (
          <p className="text-red-600 pb-4 text-center">{errorForm}</p>
        )}
        <CategoryForm
          className="px-4"
          handleSubmit={handleSubmit}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          selectedEmoji={selectedEmoji}
          setSelectedEmoji={setSelectedEmoji}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          isLoading={addCategoryMutation.isPending}
          setErrorForm={setErrorForm}
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
  isLoading,
  setErrorForm
}: {
  className?: string;
  handleSubmit: (e: React.FormEvent) => void;
  categoryName: string;
  setCategoryName: (name: string) => void;
  selectedEmoji: string;
  setSelectedEmoji: (emoji: string) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
  isLoading: boolean;
  setErrorForm: (value: string) => void;
}) {
  return (
    <form onSubmit={handleSubmit} className={cn("grid gap-4", className)}>
      <div className="grid items-center grid-cols-4 gap-4">
        <Label className="text-right text-sm font-semibold">Nom</Label>
        <Input
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value)
            if (e.target.value.trim() != "") {
              setErrorForm("");
            }
          }}
          placeholder="Nom de la catégorie"
          className="col-span-3"
          disabled={isLoading}
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
