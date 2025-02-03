"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchbarProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
}

export function Searchbar({ className, onChange, value }: SearchbarProps) {
  return (
    <form className={cn("relative", className)}>
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Rechercher..."
        value={value}
        onChange={onChange}
        className="w-full pl-8 text-sm md:text-base"
      />
      <Button type="submit" className="sr-only">
        Rechercher
      </Button>
    </form>
  )
}


