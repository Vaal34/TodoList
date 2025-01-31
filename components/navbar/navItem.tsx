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
                {tasks
                  .filter((task) => task.categoryId === item.id)
                  .map((task) => (
                    <SidebarMenuSubItem key={task.id}>
                      <SidebarMenuSubButton>
                        <span className="truncate  w-4/5">{task.title}</span>
                        <span className={`w-3 h-3 rounded-full ml-auto
                          ${task.importance === "FAIBLE"
                            ? "bg-green-500"
                            : task.importance === "MOYEN"
                              ? "bg-yellow-500"
                              : task.importance === "FORT"
                                ? "bg-red-500"
                                : "bg-gray-100 hover:bg-gray-200"
                          }
                          `}></span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
