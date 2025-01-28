"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut()}
      title="Se déconnecter"
      aria-label="Se déconnecter"
      className="w-full"
    >
      Logout
      <LogOut />
    </Button>
  );
}
