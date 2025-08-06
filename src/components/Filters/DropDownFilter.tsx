"use client";

import {Select,SelectContent,SelectValue,SelectItem,SelectTrigger} from "@/components/ui/select";

export function OriginFilter() {
    return(
        <Select onValueChange={(value) => console.log("Selecionado:", value)}>
            <SelectTrigger className="w-[200px] rounded-md border border-gray-300 focus:outline-none focus:ring-0 "
            >
                <SelectValue placeholder= "Selecione.."></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Todas as Origens</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="google">Google</SelectItem>
            </SelectContent>
        </Select>
    )
}

{/*Filtro dopDown de tipos */}
interface TypesFilterProps {
    value: "revenda" | "utilizacao" | "todos";
    onChange: (val: "revenda" | "utilizacao"| "todos") => void;
}

export function TypesFilter({value, onChange}: TypesFilterProps) {
    return(
        <Select value={value} onValueChange={(val) => onChange(val as "revenda" | "utilizacao" | "todos")}>
            <SelectTrigger className="w-[200px] rounded-md border border-gray-300 focus:outline-none "
            >
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