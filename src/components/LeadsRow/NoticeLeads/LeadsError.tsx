"use client";

import { AlertTriangle, RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button";

export function LeadsError() {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center" style={{color: "var(--color-error-600)"}}>
            <AlertTriangle className="h-12 w-12 mb-4" style={{color: "var(--color-error-600)"}} />
            <p className="text-lg font-medium">Ocorreu um erro ao carregar os leads</p>
            <div className="pt-4">
                <Button className=" border-1 border-[var(--color-error-500)] text-[var(--color-error-600)] hover:text-[var(--color-error-700)] hover:bg-[var(--color-error-50)] "
                    variant="ghost" onClick={() => window.location.reload()}><RotateCcw /> Tentar novemente </Button>
            </div>

        </div>
    )
}