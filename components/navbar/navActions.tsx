import { AddCategory } from "@/components/navbar/add/addCategory";
import { AddTasks } from "@/components/navbar/add/addTasks";
import { useSession } from "next-auth/react";
import { SidebarGroup, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { DeleteItem } from "./delete/deleteModal";

export function NavAdd() {
  const { data: session } = useSession();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          {session && <AddCategory session={session} />}
          {session && <AddTasks session={session} />}
          {session && <DeleteItem session={session} />}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
