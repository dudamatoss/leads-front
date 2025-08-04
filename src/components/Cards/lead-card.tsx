"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users2 } from "lucide-react";

export function LeadCard() {
    return (
        <Card className="w-full max-w-md shadow-sm rounded-xl">
            <CardContent className="p-6 flex flex-row justify-between items-center">
                {/* Texto à esquerda */}
                <div>
                    <p className="text-sm text-muted-foreground font-medium">
                        Total de Leads Ativos
                    </p>

                    <h2 className="text-4xl font-bold text-foreground mt-2">4</h2>

                </div>

                {/* Ícone à direita */}
                <div className="p-2 rounded-md bg-orange-100 text-orange-500">
                    <Users2 className="w-6 h-6" />
                </div>
            </CardContent>
        </Card>
    );
}
