"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { ReactNode } from "react";

interface MobileDetectorProps {
  children: (isMobile: boolean) => ReactNode;
  breakpoint?: number;
}

export default function MobileDetector({
  children,
  breakpoint = 768,
}: MobileDetectorProps) {
  const isMobile = useIsMobile(breakpoint);

  return <>{children(isMobile)}</>;
}
