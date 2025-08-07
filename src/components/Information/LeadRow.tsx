"use client";

import { useState } from "react";
import { LeadType } from "@/schemas/leads-schemas";
import { Input } from "@/components/ui/input";
import { CopyableText } from "@/components/Copy/CopyText";
import { StatusButton } from "@/components/Information/ItemsRow/StatusCheck";
import {putLead} from "@/lib/services/put-leads";
import {TypeDropdown} from "@/components/Information/ItemsRow/TypeDropDown";
import {ParceiroInput} from "@/components/Information/ItemsRow/ParceiroInput";

type Props = {
    lead: LeadType;
};

export function LeadRow({ lead }: Props) {
    const [localStatus, setLocalStatus] = useState<"ativo" | "concluido">(lead.status as "ativo" | "concluido");
    const [localInteresse, setLocalInteresse] = useState<"revenda" | "utilizacao">(lead.interesse as "revenda" | "utilizacao");



    return (
        <div className="grid grid-cols-[1.5fr_1.1fr_1.3fr_1.2fr_1.2fr_1fr_1fr] items-center gap-4 px-8 py-3 border rounded-md bg-white text-sm">
            {/* Contato */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-500/80 text-white font-semibold flex items-center justify-center rounded-full text-xs uppercase">
                    {(lead.nome ?? "" +
                        "-").slice(0, 2)}
                </div>
                <div>
                    {lead.nome?.trim() && (
                        <CopyableText text={lead.nome} className="text-muted-foreground" />
                    )}
                    {lead.email?.trim() && (
                        <CopyableText text={lead.email} className="text-muted-foreground" />
                    )}
                    {lead.cnpj?.trim() && (
                        <CopyableText text={lead.cnpj} className="text-muted-foreground" />
                    )}
                </div>
            </div>

            {/* Origem */}
            <span className="text-gray-600 font-medium p-5">{lead.fonte?.trim() ? (lead.fonte) : (<span className="text-gray-400 font-normal italic">Não informado</span>) }</span>

            {/* Anúncio */}
            <span className="text-orange-400 font-normal">{lead.anuncio?.trim() ? (lead.anuncio) : (<span className="text-gray-400 font-normal italic">Não informado</span>)}</span>

            {/* Tipo (interesse) */}
            <div>
                <TypeDropdown
                    value={localInteresse}
                    onChange={async (newValue) => {
                        try {
                            await putLead({
                                id_leads_comercial: lead.id_leads_comercial,
                                interesse: newValue,
                            });
                            setLocalInteresse(newValue);
                        } catch (error) {
                            console.error("Erro ao atualizar interesse:", error);
                        }
                    }}
                />
            </div>

            {/* Data */}
            <span className="text-gray-600 font-medium whitespace-nowrap">
                {`${new Date(lead.data_hora).toLocaleDateString("pt-BR")} ${new Date(lead.data_hora).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}`}
            </span>

            {/* Parceiro */}
            <ParceiroInput initialValue={lead.parceiro ?? ""} onConfirm={
                async  (newValue) => {
                    await putLead({
                        id_leads_comercial: lead.id_leads_comercial,
                        parceiro: newValue,
                    })
                }
            }/>

            {/* Status */}
            <div className="justify-self-end">
                <StatusButton
                    status={localStatus}
                    onClick={async () => {
                        const newStatus = localStatus === "ativo" ? "concluido" : "ativo";
                        try{
                           await putLead({
                               id_leads_comercial: lead.id_leads_comercial,
                               status: newStatus,
                           });
                           setLocalStatus(newStatus);

                    }catch(e){
                            console.log("Erro ao atualizar: ",e);
                        }
                    }}
                />
            </div>
        </div>
    );
}
