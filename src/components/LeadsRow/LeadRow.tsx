"use client";

import { useState } from "react";
import { LeadType } from "@/schemas/leads-schemas";
import { CopyableText } from "@/components/Copy/CopyText";
import { putLead } from "@/lib/services/put-leads";
import {TypeDropdown} from "@/components/LeadsRow/ItemsRow/TypeDropDown";
import {ParceiroInput} from "@/components/LeadsRow/ItemsRow/ParceiroInput";
import {StatusButton} from "@/components/LeadsRow/ItemsRow/StatusCheck";
import {ContactAvatar} from "@/components/LeadsRow/ItemsRow/Contact/ContactAvatar";


type Props = {
    lead: LeadType;
    onUpdate?: () => void;
};

export function LeadRow({ lead, onUpdate }: Props) {
    const [localStatus, setLocalStatus] = useState<"ativo" | "concluido">(lead.status as "ativo" | "concluido");
    const [localInteresse, setLocalInteresse] = useState<"revenda" | "utilizacao">(lead.interesse as "revenda" | "utilizacao");


    return (
        <div className="grid grid-cols-[1.5fr_1.1fr_1.3fr_1.2fr_1.2fr_1fr_1fr] items-center gap-4 px-8 py-3 border rounded-md bg-white text-sm">
            {/* Contato */}
            <div className="flex items-center gap-3">
               <ContactAvatar name={lead.nome} />
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
                            onUpdate?.();
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
            <ParceiroInput
                initialValue={lead.parceiro ?? ""}
                onConfirm={async (newValue) => {
                    try {
                        await putLead({
                            id_leads_comercial: lead.id_leads_comercial,
                            parceiro: newValue,
                        });
                        onUpdate?.();
                    } catch (error) {
                        console.error("Erro ao atualizar parceiro:", error);
                    }
                }}
            />

            {/* Status */}
            <div className="justify-self-end">
                <StatusButton
                    status={localStatus}
                    onClick={async () => {
                        const newStatus =
                            localStatus === "ativo" ? "concluido" : "ativo";
                        try {
                            await putLead({
                                id_leads_comercial: lead.id_leads_comercial,
                                status: newStatus,
                            });
                            setLocalStatus(newStatus);
                            onUpdate?.();
                        } catch (e) {
                            console.log("Erro ao atualizar: ", e);
                        }
                    }}
                />
            </div>
        </div>
    );
}