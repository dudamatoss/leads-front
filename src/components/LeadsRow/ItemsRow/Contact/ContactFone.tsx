"use client";

import { LeadType } from "@/schemas/leads-schemas";
import { EditContact } from "./EditContact";
import { usePutLead } from "@/hooks/usePutLeads";
import { useUndo } from "@/components/Undo/Undo";
import { formatPhone } from "@/lib/services/formats/format-fone";

interface Props {
    lead: LeadType;
    onUpdate?: () => void;
}

export function ContactPhone({ lead, onUpdate }: Props) {
    const { updateLead } = usePutLead();
    const showUndo = useUndo();

    if (!lead.telefone?.trim()) return null;

    return (
        <EditContact
            initialValue={lead.telefone}
            formatter={formatPhone}
            onConfirm={async (newValue) => {
        try {
            await updateLead({
                id_leads_comercial: lead.id_leads_comercial,
                telefone: newValue,
            });
            onUpdate?.();
            showUndo(async () => {
                await updateLead({
                    id_leads_comercial: lead.id_leads_comercial,
                    telefone: lead.telefone,
                });
                onUpdate?.();
            });
        } catch (error) {
            console.error("Erro ao atualizar telefone:", error);
        }
    }}
    className="text-muted-foreground w-[150px]"
        />
);
}