"use client";

import { AlertTriangle, RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button";

export function LeadsError() {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center text-red-600">
            <AlertTriangle className="h-12 w-12 mb-4 text-red-600" />
            <p className="text-lg font-medium">Ocorreu um erro ao carregar os leads</p>
            <div className="pt-4">
            <Button className="text-red-600 bg-red-50 border-1 border-red-200 hover:text-red-700 hover:bg-red-100 "
                    variant="ghost" onClick={() => window.location.reload()} ><RotateCcw /> Tentar novemente </Button>
            </div>

        </div>
    )
}