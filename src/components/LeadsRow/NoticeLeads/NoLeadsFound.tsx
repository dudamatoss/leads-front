"use client";

import { SearchX} from "lucide-react";


export function NoLeadsFound() {
    return (
        <div  className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <SearchX className="h-12 w-12 mb-4 text-muted-foreground" />
            <p className="text-lg font-medium">Nenhum lead encontrado</p>
            <p className="text-sm">Ajuste os filtros ou a busca</p>
        </div>
    )
}