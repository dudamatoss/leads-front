"use client";

import { LeadType } from "@/schemas/leads-schemas";
import { EditContact } from "./EditContact";
import { usePutLead } from "@/hooks/usePutLeads";
import { useUndo } from "@/components/Undo/Undo";
import { formatCnpj } from "@/lib/services/formats/format-cnpj";

interface Props {
    lead: LeadType;
    onUpdate?: () => void;
}

export function ContactCnpj({ lead, onUpdate }: Props) {
    const { updateLead } = usePutLead();
    const showUndo = useUndo();

    if (!lead.cnpj?.trim()) return null;

    return (
        <EditContact
            initialValue={lead.cnpj}
            formatter={formatCnpj}
            onConfirm={async (newValue) => {
                try {
                    await updateLead({
                        id_leads_comercial: lead.id_leads_comercial,
                        cnpj: newValue,
                    });
                    onUpdate?.();
                    showUndo(async () => {
                        await updateLead({
                            id_leads_comercial: lead.id_leads_comercial,
                            cnpj: lead.cnpj,
                        });
                        onUpdate?.();
                    });
                } catch (error) {
                    console.error("Erro ao atualizar CNPJ:", error);
                }
            }}
            className="text-muted-foreground w-[150px]"

        />
    );
}