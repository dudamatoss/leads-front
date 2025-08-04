"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
}

export function SearchFilter({ placeholder, value, onChange }: SearchInputProps) {
    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="pl-10 focus:outline-none focus-visible:border-orange-500 focus-visible:ring-orange-300 focus-visible:ring-2 "
            />
        </div>
    );
}
