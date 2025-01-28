import { useState } from "react";
import { useSession } from "next-auth/react";
import { FolderPlus, PlusCircle } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { AddCategory } from "@/components/navbar/addCategory";
import { AddTasks } from "./addTasks";


export function NavAdd({ onCategoryAdded }: { onCategoryAdded: () => void }) {
  const { data: session } = useSession();



  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <AddCategory session={session} onCategoryAdded={onCategoryAdded} />
          <AddTasks session={session} />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
