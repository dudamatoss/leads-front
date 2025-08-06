"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CircleCheckBig, Clock3 } from "lucide-react";

interface StatusFilterProps {
    value: "ativos" | "concluidos";
    onChange: (value: "ativos" | "concluidos") => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
    return (
        <ToggleGroup
            type="single"
            value={value}
            onValueChange={(val) => val && onChange(val as "ativos" | "concluidos")}
            className="bg-muted p-1 rounded-xl"
        >
            <ToggleGroupItem
                value="ativos"
                className="px-4 py-2 rounded-lg text-black data-[state=on]:bg-orange-500/80 data-[state=on]:text-white data-[state=on]:shadow-sm"
            >
                <Clock3 className="mr-2 h-4 w-4" />
                Ativos
            </ToggleGroupItem>

            <ToggleGroupItem
                value="concluidos"
                className="px-4 py-2 rounded-lg text-black data-[state=on]:bg-orange-500/80 data-[state=on]:text-white data-[state=on]:shadow-sm"
            >
                <CircleCheckBig className="mr-2 h-4 w-4" />
                Concluídos
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
