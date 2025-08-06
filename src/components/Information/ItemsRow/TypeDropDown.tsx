
"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TypeRowDropdownProps {
    value: string;
    onChange?: (value: string) => void;
}

export function TypeDropdown({ value, onChange }: TypeRowDropdownProps) {
    const normalized = value.toLowerCase();

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger
                className={cn(
                    "text-xs w-fit px-3 h-6 rounded-full font-medium",
                    normalized === "revenda"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                )}
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="utilizacao">Utilização</SelectItem>
                <SelectItem value="revenda">Revenda</SelectItem>
            </SelectContent>
        </Select>
    );
}
