import { useSession } from "next-auth/react";
import { SidebarGroup, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { AddCategory } from "@/components/navbar/add/addCategory";
import { AddTasks } from "@/components/navbar/add/addTasks";
import { DeleteItem } from "./delete/deleteModal";

export function NavAdd({ onDataAdded }: { onDataAdded: () => void }) {
  const { data: session } = useSession();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          {session && <AddCategory session={session} onDataAdded={onDataAdded} />}
          {session && <AddTasks session={session} onDataAdded={onDataAdded} />}
          {session && <DeleteItem session={session}/>}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
