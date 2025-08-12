"use client";

import {User2, Zap, Megaphone, List, Calendar, Handshake, MessageCircleQuestion} from "lucide-react";

interface Props {
    showParceiro?: boolean;
}


export function LeadsHeader({ showParceiro = true }: Props) {
    return (
        <div className="w-full bg-muted rounded-md px-16 py-3 flex items-center justify-between text-sm font-medium text-muted-foreground">
        {/*Contato*/}
            <div className=" ml-3 flex items-center text-orange-500">
                <User2 className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Contato</span>
            </div>
            {/*Origem*/}
            <div className=" flex items-center  text-orange-500">
             <Zap className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Origem</span>
            </div>
            {/*Anuncio*/}
            <div className=" flex items-center  text-orange-500">
                <Megaphone className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Anuncio</span>
            </div>
            {/*Tipo*/}
            <div className=" flex items-center  text-orange-500">
                <List className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Tipo</span>
            </div>
            {/*Data*/}
            <div className=" flex items-center  text-orange-500">
                <Calendar className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Data</span>
            </div>
            {/*Parceiro*/}
            {showParceiro && (
                <div className=" flex items-center  text-orange-500">
                    <Handshake className="h-4 w-4" />
                    <span className="text-foreground text-gray-700">Parceiro</span>
                </div>
            )}
            {/*Status*/}
            <div className="mr-3 flex items-center  text-orange-500">
                <MessageCircleQuestion className="h-4 w-4" />
                <span className="text-foreground text-gray-700">Status</span>
            </div>


        </div>
    )
}