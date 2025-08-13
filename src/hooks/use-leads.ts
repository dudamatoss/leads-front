import { useCallback, useEffect, useState } from "react";
import { LeadType } from "@/schemas/leads-schemas";
import {useGetLeads, UseLeadsParams} from "@/hooks/use-get-leads";

export function useLeadsPolling(params: UseLeadsParams, interval = 5000) {
    const { leads, loading, error, refetch } = useGetLeads(params);

    useEffect(() => {
        const id = setInterval(refetch, interval);
        return () => clearInterval(id);
    }, [refetch, interval]);

    return { leads, loading, error, refetch };
}