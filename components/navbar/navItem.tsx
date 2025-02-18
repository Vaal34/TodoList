"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Category, Task } from "@prisma/client";

export function NavItem({
  category,
  tasks,
}: {
  category: Category[];
  tasks: Task[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Catégories</SidebarGroupLabel>
      <SidebarMenu>
        {category?.map((item) => (
          <Collapsible key={item.id}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.name}>
                <span>{item.emoji}</span>
                <span>{item.name}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {tasks.filter((task) => task.categoryId === item.id).length >
                0 ? (
                  tasks
                    .filter((task) => task.categoryId === item.id)
                    .map((task) => (
                      <SidebarMenuSubItem key={task.id}>
                        <SidebarMenuSubButton>
                          <span className="w-4/5 truncate">{task.title}</span>
                          <span
                            className={`ml-auto h-3 w-3 rounded-full ${
                              task.importance === "FAIBLE"
                                ? "bg-faible"
                                : task.importance === "MOYEN"
                                  ? "bg-moyen"
                                  : "bg-fort"
                            } `}
                          ></span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))
                ) : (
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <span className="text-sm text-muted-foreground">
                        Aucune tâche
                      </span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
