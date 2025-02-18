"use client";

import LoginButton from "@/components/navbar/loginButton";
import { NavAdd } from "@/components/navbar/navActions";
import { NavItem } from "@/components/navbar/navItem";
import { NavUser } from "@/components/navbar/navUser";
import { NavSettings } from "@/components/navbar/settings/settings";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useCategories, useTasks } from "@/hooks/useData";
import { useSession } from "next-auth/react";

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
        <SidebarSeparator />
        <NavSettings />
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
