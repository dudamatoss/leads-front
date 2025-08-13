"use client";

import { AlertTriangle} from "lucide-react";

export function LeadsError() {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center text-red-600">
            <AlertTriangle className="h-12 w-12 mb-4 text-red-600" />
            <p className="text-lg font-medium">Ocorreu um erro ao carregar os leads</p>
            <p className="text-sm">Alguém tem que ver isso ai...</p>
        </div>
    )
}