"use client";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface InteresseButtonProps {
    value: "revenda" | "utilizacao";
    onChange: (newValue: "revenda" | "utilizacao") => void;
}

export function TypeDropdown({ value, onChange }: InteresseButtonProps) {
    const normalized = value.toLowerCase();

    return (
        <Select value={value} onValueChange={(val) => onChange(val as "revenda" | "utilizacao")}>
            <SelectTrigger
                className={cn(
                    "text-xs w-fit px-3 h-8 rounded-md font-medium",
                    normalized === "revenda"
                        ? "text-[var(--color-primary-500)] hover:bg-[var(--color-primary-100)] dark:hover:bg-[var(--color-primary-dark-30)]"
                        : "text-[var(--color-purple-500)] hover:bg-[var(--color-purple-100)] dark:hover:bg-[var(--color-purple-dark-30)]"
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
