"use client";

import {User2, Zap, Megaphone, List, Calendar, Handshake, MessageCircleQuestion} from "lucide-react";

interface Props {
    showParceiro?: boolean;
}


export function LeadsHeader({ showParceiro = true }: Props) {
    const gridTemplate = showParceiro
        ? "grid-cols-[1.5fr_1.1fr_1.3fr_1.2fr_1.2fr_1fr_1fr]"
        : "grid-cols-[1.5fr_1.5fr_1.3fr_1.2fr_1fr_1fr]";
    return (
        <div
            className={`grid ${gridTemplate} w-full items-center justify-items-start gap-4 rounded-md bg-muted px-8 py-3 text-sm font-medium text-muted-foreground`}
        >
            {/*Contato*/}
            <div className="flex items-center gap-2 text-orange-500">
                <User2 className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Contato</span>
            </div>
            {/*Origem*/}
            <div className="flex items-center gap-2 text-orange-500">
                <Zap className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Origem</span>
            </div>
            {/*Anuncio*/}
            <div className="flex items-center gap-2 text-orange-500">
                <Megaphone className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Anuncio</span>
            </div>
            {/*Tipo*/}
            <div className="flex items-center gap-2 text-orange-500">
                <List className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Tipo</span>
            </div>
            {/*Data*/}
            <div className="flex items-center gap-2 text-orange-500">
                <Calendar className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Data</span>
            </div>
            {/*Parceiro*/}
            {showParceiro && (
                <div className="flex items-center gap-2 text-orange-500">
                    <Handshake className="h-4 w-4" />
                    <span className="text-foreground text-gray-700">Parceiro</span>
                </div>
            )}
            {/*Status*/}
            <div className="flex items-center gap-2 text-orange-500 justify-self-end">
                <MessageCircleQuestion className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Status</span>
            </div>
        </div>
    );
}
