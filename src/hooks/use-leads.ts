import {  useEffect } from "react";
import {useGetLeads, UseLeadsParams} from "@/hooks/use-get-leads";

export function useLeadsPolling(params: UseLeadsParams, interval = 5000) {
    const { leads, loading, error, refetch,totalPages } = useGetLeads(params);

    useEffect(() => {
        if (error) return ;
        const id = setInterval(refetch, interval);
        return () => clearInterval(id);
    }, [refetch, interval, error]);

    return { leads, loading, error, refetch, totalPages };
}