"use client";

import CustomDock, { DockItemData } from "@/components/Dock/CustomDock";
import { useCategories, useTasks } from "@/hooks/useData";
import {
  Calendar,
  Home,
  LogIn,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MobileDock() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: categories } = useCategories(session?.user?.id ?? "");
  const { data: tasks } = useTasks(session?.user?.id ?? "");

  const dockItems: DockItemData[] = [
    {
      icon: <Home className="h-5 w-5 text-white" />,
      label: "Accueil",
      onClick: () => router.push("/"),
    },
    {
      icon: <Calendar className="h-5 w-5 text-white" />,
      label: "Tâches",
      onClick: () => router.push("/tasks"),
    },
    {
      icon: <Plus className="h-5 w-5 text-white" />,
      label: "Ajouter",
      onClick: () => router.push("/add"),
    },
    {
      icon: <Search className="h-5 w-5 text-white" />,
      label: "Rechercher",
      onClick: () => router.push("/search"),
    },
    {
      icon: <Settings className="h-5 w-5 text-white" />,
      label: "Paramètres",
      onClick: () => router.push("/settings"),
    },
  ];

  // Ajouter un élément de connexion/déconnexion en fonction du statut d'authentification
  if (status === "authenticated") {
    dockItems.push({
      icon: <User className="h-5 w-5 text-white" />,
      label: session.user?.name || "Profil",
      onClick: () => router.push("/profile"),
    });
  } else {
    dockItems.push({
      icon: <LogIn className="h-5 w-5 text-white" />,
      label: "Connexion",
      onClick: () => router.push("/api/auth/signin"),
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <CustomDock
        items={dockItems}
        magnification={55}
        baseItemSize={35}
        panelHeight={55}
        dockHeight={75}
        distance={90}
        className="bg-black/80 backdrop-blur-md"
        spring={{ mass: 0.2, stiffness: 180, damping: 15 }}
      />
    </div>
  );
}
