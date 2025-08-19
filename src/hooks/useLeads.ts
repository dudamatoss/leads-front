import {  useEffect } from "react";
import {useGetLeads, UseLeadsParams} from "@/hooks/useGetLeads";
import {POLLING_INTERVAL} from "@/lib/config";


export function useLeadsPolling(params: UseLeadsParams, interval = POLLING_INTERVAL) {
    const { leads, loading, error, refetch,totalPages } = useGetLeads(params);

    useEffect(() => {
        if (error) return ;
        const id = setInterval(() => refetch(true), interval);
        return () => clearInterval(id);
    }, [refetch, interval, error]);

    return { leads, loading, error, refetch, totalPages };
}