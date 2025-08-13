import { useCallback, useEffect, useState } from "react";
import { LeadType } from "@/schemas/leads-schemas";
import { getLeads } from "@/lib/services/get-leads";

export interface UseLeadsParams {
    page: number;
    limit: number;
    status: string;
    interesse?: string;
    fonte?: string;
    busca?: string;
}

export function useGetLeads(params: UseLeadsParams) {
    const [leads, setLeads] = useState<LeadType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { page, limit, status, interesse, fonte, busca } = params;

    const fetchLeads = useCallback(() => {
        setError(false);
        return getLeads({ page, limit, status, interesse, fonte, busca })
            .then(setLeads)
            .catch((err) => {
                console.error("Erro ao buscar leads:", err);
                setError(true);
                setLeads([]);
            })
            .finally(() => setLoading(false));
    }, [page, limit, status, interesse, fonte, busca]);

    useEffect(() => {
        setLoading(true);
        fetchLeads();
    }, [fetchLeads]);

    return { leads, loading, error, refetch: fetchLeads };
}