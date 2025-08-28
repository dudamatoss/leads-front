"use client";

import {Select,SelectContent,SelectValue,SelectItem,SelectTrigger} from "@/components/ui/select";

interface OriginFilterProps {
    value: "Instagram"| "Facebook" | "Google" | "todos";
    onChange: (value: "Instagram"| "Facebook" | "Google" | "todos") => void;
}
export function OriginFilter({value, onChange}: OriginFilterProps) {
    return(
        <Select value={value} onValueChange={(value) => onChange(value as "Instagram"| "Facebook" | "Google" | "todos")}>
            <SelectTrigger className="w-[200px]">
                <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="todos">Todas as Origens</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Google">Google</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
        </Select>
    )
}

{/*Filtro dopDown de tipos */}
interface TypesFilterProps {
    value: "revenda" | "utilizacao" | "todos";
    onChange: (value: "revenda" | "utilizacao"| "todos") => void;
}

export function TypesFilter({value, onChange}: TypesFilterProps) {
    return(
        <Select value={value} onValueChange={(value) => onChange(value as "revenda" | "utilizacao" | "todos")}>
            <SelectTrigger className="w-[200px]">
                <SelectValue ></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="revenda">Revenda</SelectItem>
                <SelectItem value="utilizacao">Utilização</SelectItem>
            </SelectContent>
        </Select>
    )
}