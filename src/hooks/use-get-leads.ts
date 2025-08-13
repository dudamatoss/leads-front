import { useCallback, useEffect, useState } from "react";
import { LeadType } from "@/schemas/leads-schemas";
import { getLeads, getLeadsTotais } from "@/lib/services/get-leads";

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
    const [totalPages, setTotalPages] = useState(1);

    const { page, limit, status, interesse, fonte, busca } = params;

    const fetchLeads = useCallback(async () => {
        setError(false);
        try {
            const [leadsResponse, totals] = await Promise.all([
                getLeads({ page, limit, status, interesse, fonte, busca }),
                getLeadsTotais({ page: 1, limit, status, interesse, fonte, busca }),
            ]);
            setLeads(leadsResponse);
            setTotalPages(Math.max(1, totals.totalPaginas));
        } catch (err) {
            console.error("Erro ao buscar leads:", err);
            setError(true);
            setLeads([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page, limit, status, interesse, fonte, busca]);

    useEffect(() => {
        setLoading(true);
        fetchLeads();
    }, [fetchLeads]);

    return { leads, loading, error, refetch: fetchLeads, totalPages };
}