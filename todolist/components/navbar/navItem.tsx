"use client";

import { ChevronRight, Icon } from "lucide-react";

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

export function NavItem({ category, tasks }: { category: Category[], tasks: Task[] }) {
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
                  .filter(task => task.categoryId === item.id)
                  .map((task) => (
                    <SidebarMenuSubItem key={task.id}>
                      <SidebarMenuSubButton 
                        className={`
                          ${task.importance === "FAIBLE" 
                              ? "bg-green-100 hover:bg-green-200" 
                              : task.importance === "MOYEN" 
                              ? "bg-yellow-100 hover:bg-yellow-200"
                              : task.importance === "FORT"
                              ? "bg-red-100 hover:bg-red-200"
                              : "bg-gray-100 hover:bg-gray-200"
                          }
                        `}
                      >
                        <span>{task.title}</span>
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
