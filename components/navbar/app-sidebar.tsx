"use client";

import { useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import LoginButton from "@/components/navbar/loginButton";
import { NavUser } from "@/components/navbar/navUser";
import { NavItem } from "@/components/navbar/navItem";
import { NavAdd } from "@/components/navbar/navActions";
import { useCategories, useTasks } from "@/hooks/useData";

export default function AppSidebar() {
  const { data: session, status } = useSession();
  const { data: categories } = useCategories(session?.user?.id ?? "");
  const { data: tasks } = useTasks(session?.user?.id ?? "");

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <NavItem category={categories ?? []} tasks={tasks ?? []} />
        <SidebarSeparator />
        <NavAdd />
      </SidebarContent>
      <SidebarFooter>
        {status === "authenticated" ? (
          <NavUser user={session.user} />
        ) : (
          <LoginButton />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
