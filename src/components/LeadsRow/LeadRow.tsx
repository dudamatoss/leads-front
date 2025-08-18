"use client";

import { useState } from "react";
import { LeadType } from "@/schemas/leads-schemas";
import { CopyableText } from "@/components/Copy/CopyText";
import { usePutLead } from "@/hooks/usePutLeads";
import { TypeDropdown } from "@/components/LeadsRow/ItemsRow/TypeDropDown";
import { ParceiroInput } from "@/components/LeadsRow/ItemsRow/ParceiroInput";
import { StatusButton } from "@/components/LeadsRow/ItemsRow/StatusCheck";
import { ContactAvatar } from "@/components/LeadsRow/ItemsRow/Contact/ContactAvatar";
import { Input } from "@/components/ui/input";
import {useUndo} from "@/components/Undo/Undo";
import { formatCnpj} from "@/lib/services/formats/format-cnpj";
import {formatDate} from "@/lib/services/formats/format-date";

type Props = {
    lead: LeadType;
    onUpdate?: () => void;
    showParceiro?: boolean;
};

export function LeadRow({ lead, onUpdate, showParceiro = true }: Props) {
    const [localStatus, setLocalStatus] = useState<"ativo" | "concluido">(lead.status as "ativo" | "concluido");
    const [localInteresse, setLocalInteresse] = useState<"revenda" | "utilizacao">(lead.interesse as "revenda" | "utilizacao");
    const { updateLead } = usePutLead();
    const  showUndo  = useUndo();

    const formattedDate = formatDate(lead.data_hora);
    const gridTemplate = showParceiro
        ? "grid-cols-[1.5fr_1.1fr_1.3fr_1.2fr_1.2fr_1fr_1fr]"
        : "grid-cols-[1.5fr_1.5fr_1.3fr_1.2fr_1fr_1fr]";

    return (
        <div
            className={`grid ${gridTemplate} items-center gap-4 px-6 py-3 border rounded-md bg-card text-sm animate-in fade-in slide-in-from-bottom-1 duration-300`}>
            {/* Contato */}
            <div className="flex items-center gap-3 min-w-0">
                <ContactAvatar name={lead.nome} interesse={localInteresse} />
                <div className="min-w-0">
                    {lead.nome?.trim() && (
                        <CopyableText text={lead.nome} className="text-muted-foreground max-w-[180px]"/>
                    )}
                    {lead.email?.trim() && (
                        <CopyableText text={lead.email} className="text-muted-foreground max-w-[200px]"/>
                    )}
                    {lead.cnpj?.trim() && (
                        <CopyableText text={formatCnpj(lead.cnpj)} className="text-muted-foreground max-w-[150px]"/>
                    )}
                </div>
            </div>

            {/* Origem */}
            <span className="text-muted-foreground font-medium p-5">{lead.fonte?.trim() ? (lead.fonte) : (<span className="text-muted-foreground font-normal italic">Não informado</span>)}</span>
            {/* Anúncio */}
            <span className="text-orange-400 font-normal">{lead.anuncio?.trim() ? (lead.anuncio) : (<span className="text-muted-foreground font-normal italic">Não informado</span>)}</span>

            {/* Tipo (interesse) */}
            <div>
                <TypeDropdown
                    value={localInteresse}
                    onChange={async (newValue) => {

                        try {
                            await updateLead({
                                id_leads_comercial: lead.id_leads_comercial,
                                interesse: newValue,
                            });
                            setLocalInteresse(newValue);
                            onUpdate?.();
                            showUndo(async () => {
                                await updateLead({
                                    id_leads_comercial: lead.id_leads_comercial,
                                    interesse: localInteresse,
                                });
                                setLocalInteresse(localInteresse);
                                onUpdate?.();
                            });
                        } catch (error) {
                            console.error("Erro ao atualizar interesse:", error);
                        }
                    }}
                />
            </div>

            {/* Data */}
            <span className="text-muted-foreground font-medium whitespace-nowrap">
                {formattedDate}
            </span>

            {/* Parceiro */}
            {showParceiro && (
                localInteresse === "revenda" ? (
                    <Input
                        value=""
                        placeholder="Não se aplica"
                        readOnly
                        className="h-7 w-[140px] text-sm  bg-muted text-muted-foreground italic outline-dashed outline outline-offset-0"/>
                ) : (
                    <ParceiroInput
                        initialValue={lead.parceiro ?? ""}
                        onConfirm={async (newValue) => {
                            try {
                                await updateLead({
                                    id_leads_comercial: lead.id_leads_comercial,
                                    parceiro: newValue,
                                });
                                onUpdate?.();
                                showUndo(async () => {
                                    await updateLead({
                                        id_leads_comercial: lead.id_leads_comercial,
                                        parceiro: lead.parceiro ?? "",
                                    });
                                    onUpdate?.();
                                })
                            } catch (error) {
                                console.error("Erro ao atualizar parceiro:", error);
                            }
                        }}
                    />
                )
            )}

            {/* Status */}
            <div className="justify-self-end">
                <StatusButton
                    status={localStatus}
                    onClick={async () => {
                        const newStatus =
                            localStatus === "ativo" ? "concluido" : "ativo";
                        try {
                            await updateLead({
                                id_leads_comercial: lead.id_leads_comercial,
                                status: newStatus,
                            });
                            setLocalStatus(newStatus);
                            onUpdate?.();
                            showUndo(async () => {
                                await updateLead({
                                    id_leads_comercial: lead.id_leads_comercial,
                                    status: localStatus,
                                });
                                setLocalStatus(localStatus);
                                onUpdate?.();
                            })
                        } catch (e) {
                            console.log("Erro ao atualizar: ", e);
                        }
                    }}
                />
            </div>
        </div>
    );
}