"use client";

import { ClientOnly } from "@/components/ClientOnly";
import AppSidebar from "@/components/navbar/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

// Import dynamique du MobileDock
const MobileDock = dynamic(() => import("@/components/navbar/MobileDock"), {
  ssr: false,
});

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const isMobile = useIsMobile(768);

  return (
    <ClientOnly>
      <>
        {!isMobile && <AppSidebar />}
        <main className={`relative w-svw ${isMobile ? "pb-24" : ""}`}>
          {!isMobile && <SidebarTrigger className="absolute left-4 top-4" />}
          {children}
        </main>
        {isMobile && <MobileDock />}
      </>
    </ClientOnly>
  );
}
