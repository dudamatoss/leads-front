"use client";

import { Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectItem,
    SelectValue,
    SelectContent,
} from "@/components/ui/select";

export function LeadRow() {
    return (
        <div className="grid grid-cols-[1.5fr_1.3fr_1.3fr_1.2fr_1.2fr_1fr_1fr] items-center gap-4 px-10 py-3 border rounded-md bg-white text-sm">
            {/* Contato */}
            <div className="flex items-start gap-3 c">
                <div className="w-9 h-9 bg-orange-500/80 text-white font-semibold flex items-center justify-center rounded-full text-xs">
                    PS
                </div>
                <div>
                    <div className="font-medium flex items-center gap-2">
                        Pedro Silva <Copy className="w-3 h-3 cursor-pointer" />
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                        pedro.silva@email.com <Copy className="w-3 h-3 cursor-pointer" />
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                        123.456.789-00 <Copy className="w-3 h-3 cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Origem */}
            <span className="text-gray-600 font-medium">Instagram</span>

            {/* Anúncio */}
            <span className="text-gray-600 font-medium">Anúncio Q4</span>

            {/* Tipo */}
            <Select defaultValue="revenda">
                <SelectTrigger className="text-xs bg-blue-100 text-blue-800 w-fit px-3 h-6 rounded-full border-none">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="revenda">Revenda</SelectItem>
                    <SelectItem value="utilizacao">Utilização</SelectItem>
                </SelectContent>
            </Select>

            {/* Data */}
            <span className="text-gray-600 font-medium whitespace-nowrap">
        05/08/2025 08:58
      </span>

            {/* Parceiro */}
            <Input
                placeholder="Parceiro..."
                className="h-7 w-[160px] text-sm px-2 py-1 focus-visible:border-orange-500 focus-visible:ring-orange-300 focus-visible:ring-1"
            />

            {/* Status */}
            <div className="justify-self-end">
                <Button
                    variant="ghost"
                    className=" text-green-700 hover:bg-green-100 hover:text-green-700 px-3 py-3 h-8 text-sm rounded-md flex items-center gap-2 transition-colors w-fit"
                >
                    <CheckCircle className="w-4 h-4" />
                    Concluir
                </Button>
            </div>
        </div>
    );
}
