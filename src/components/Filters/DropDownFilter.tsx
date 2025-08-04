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
                <SelectItem value="all">Tdoas as Origens</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="google">Google</SelectItem>
            </SelectContent>
        </Select>
    )

}

export function TipesFilter() {
    return(
        <Select onValueChange={(value) => console.log("Selecionado:", value)}>
            <SelectTrigger className="w-[200px] rounded-md border border-gray-300 focus:outline-none "
            >
                <SelectValue placeholder= "Selecione..."></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="revenda">Utilização</SelectItem>
                <SelectItem value="utilizacao">Revenda</SelectItem>

            </SelectContent>
        </Select>
    )
}