"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {Users2, Check, Clock, Clock10, Clock3} from "lucide-react";
import { useState } from "react";

export function StatusFilter() {
    const [value, setValue] = useState("ativos");

    return (
        <ToggleGroup
            type="single"
            value={value}
            onValueChange={(val) => val && setValue(val)}
            className="bg-muted p-1 rounded-xl"
        >
            <ToggleGroupItem
                value="pendentes"
                className="px-4 py-2 rounded-lg text-black data-[state=on]:bg-orange-500/80 data-[state=on]:text-white data-[state=on]:shadow-sm"
            >
                <Clock3 className="mr-2 h-4 w-4" />
                Pendentes
            </ToggleGroupItem>

            <ToggleGroupItem
                value="concluidos"
                className="px-4 py-2 rounded-lg text-black data-[state=on]:bg-orange-500/80 data-[state=on]:text-white data-[state=on]:shadow-sm"

            >
                <Check className="mr-2 h-4 w-4" />
                Concluídos
            </ToggleGroupItem>
        </ToggleGroup>
    );
}