"use client";

import { LeadType } from "@/schemas/leads-schemas";
import { EditContact } from "./EditContact";
import { usePutLead } from "@/hooks/usePutLeads";
import { useUndo } from "@/components/Undo/Undo";

interface Props {
    lead: LeadType;
    onUpdate?: () => void;
}

export function ContactName({ lead, onUpdate }: Props) {
    const { updateLead } = usePutLead();
    const showUndo = useUndo();

    if (!lead.nome?.trim()) return null;

    return (
        <EditContact
            initialValue={lead.nome}
            onConfirm={async (newValue) => {
                try {
                    await updateLead({
                        id_leads_comercial: lead.id_leads_comercial,
                        nome: newValue,
                    });
                    onUpdate?.();
                    showUndo(async () => {
                        await updateLead({
                            id_leads_comercial: lead.id_leads_comercial,
                            nome: lead.nome,
                        });
                        onUpdate?.();
                    });
                } catch (error) {
                    console.error("Erro ao atualizar nome:", error);
                }
            }}
            className="text-muted-foreground font-bold w-[180px]"
        />
    );
}
