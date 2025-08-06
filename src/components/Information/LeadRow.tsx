"use client";

import {Copy, CheckCircle} from "lucide-react";
import {LeadType} from "@/schemas/leads-schemas";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CopyableText} from "@/components/Copy/CopyText";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from "@/components/ui/select";


type Props = {
    lead: LeadType;
};

export function LeadRow({lead}: Props) {

    return (
        <div
            className="grid grid-cols-[1.5fr_1.1fr_1.3fr_1.2fr_1.2fr_1fr_1fr] items-center gap-4 px-8 py-3 border rounded-md bg-white text-sm">
            {/* Contato */}
            <div className="flex items-center gap-3">
                <div
                    className="w-9 h-9 bg-orange-500/80 text-white font-semibold flex items-center justify-center rounded-full text-xs uppercase">
                    {(lead.nome ?? "?").slice(0, 2)}
                </div>
                <div>
                    {lead.nome?.trim() && (
                        <CopyableText text={lead.nome} className="text-muted-foreground"/>
                    )}
                    {lead.email?.trim() && (
                        <CopyableText text={lead.email} className="text-muted-foreground"/>
                    )}
                    {lead.cnpj?.trim() && (
                        <CopyableText text={lead.cnpj} className="text-muted-foreground"/>
                    )}
                </div>
            </div>
            {/* Origem */}
            <span className="text-gray-600 font-medium p-5">{lead.fonte}</span>
            {/* Anúncio */}
            <span className="text-orange-400 font-normal">{lead.anuncio}</span>
            {/* Tipo (interesse) */}
            <Select defaultValue={lead.interesse.toLowerCase()}>
                <SelectTrigger className="text-xs bg-blue-100 text-blue-800 w-fit px-3 h-6 rounded-full border-none">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="revenda">Revenda</SelectItem>
                    <SelectItem value="utilizacao">Utilização</SelectItem>
                </SelectContent>
            </Select>
            {/* Data */}
            <span className="text-gray-600 font-medium whitespace-nowrap">
        {new Date(lead.data_hora).toLocaleString("pt-BR")}
      </span>
            {/* Parceiro */}
            <Input
                defaultValue={lead.parceiro}
                placeholder="Parceiro..."
                className="h-7 w-[140px] text-sm px-2 py-1 focus-visible:border-orange-500 focus-visible:ring-orange-300 focus-visible:ring-1"/>
            {/* Status */}
            <div className="justify-self-end">
                <Button
                    variant="ghost"
                    className="text-green-700 hover:bg-green-100 hover:text-green-700 px-3 py-3 h-8 text-sm rounded-md flex items-center gap-2 transition-colors w-fit">
                    <CheckCircle className="w-4 h-4"/>
                    Concluir
                </Button>
            </div>
        </div>
    );
}

