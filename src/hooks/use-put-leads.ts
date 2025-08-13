import { useCallback, useState } from "react";
import { LeadType } from "@/schemas/leads-schemas";
import { putLead } from "@/lib/services/put-leads";

export function usePutLead() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const updateLead = useCallback((data: Partial<LeadType>) => {
        setLoading(true);
        setError(false);
        return putLead(data)
            .catch((err) => {
                console.error("Erro ao atualizar lead:", err);
                setError(true);
                throw err;
            })
            .finally(() => setLoading(false));
    }, []);

    return { updateLead, loading, error };
}