"use client";

import { LeadType } from "@/schemas/leads-schemas";
import { EditContact } from "./EditContact";
import { usePutLead } from "@/hooks/usePutLeads";
import { useUndo } from "@/components/Undo/Undo";

interface Props {
    lead: LeadType;
    onUpdate?: () => void;
}

export function ContactEmail({ lead, onUpdate }: Props) {
    const { updateLead } = usePutLead();
    const showUndo = useUndo();

    if (!lead.email?.trim()) return null;

    return (
        <EditContact
            initialValue={lead.email}
            onConfirm={async (newValue) => {
                try {
                    await updateLead({
                        id_leads_comercial: lead.id_leads_comercial,
                        email: newValue,
                    });
                    onUpdate?.();
                    showUndo(async () => {
                        await updateLead({
                            id_leads_comercial: lead.id_leads_comercial,
                            email: lead.email,
                        });
                        onUpdate?.();
                    });
                } catch (error) {
                    console.error("Erro ao atualizar email:", error);
                }
            }}
            className="text-muted-foreground w-[150px]"
        />
    );
}