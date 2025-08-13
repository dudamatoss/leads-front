"use client";

import {useEffect, useState, useCallback} from "react";
import { LeadRow } from "@/components/LeadsRow/LeadRow";
import { LeadCard } from "@/components/Cards/LeadCard";
import { StatusFilter } from "@/components/Filters/StatusFilter";
import { SearchFilter } from "@/components/Filters/SeaechFilter";
import { OriginFilter, TypesFilter } from "@/components/Filters/DropDownFilter";
import { LeadsHeader } from "@/components/LeadsRow/LeadsHeader";
import { getLeadsTotais } from "@/lib/services/get-leads";
import { LeadsTotais } from "@/schemas/leads-schemas";
import { Handshake, UserCheck, Users2 } from "lucide-react";
import { PaginationControls } from "@/components/Pagination/Pagination";
import { NoLeadsFound } from "@/components/LeadsRow/NoticeLeads/NoLeadsFound";
import { LeadsError } from "@/components/LeadsRow/NoticeLeads/LeadsError";
import { LeadsLoading } from "@/components/LeadsRow/LeadsLoading";
import { useLeadsPolling } from "@/hooks/use-leads";


const ITEMS_FOR_PAGE = 8;

export default function Home() {
    const [statusFilter, setStatusFilter] = useState<"ativos" | "concluidos">("ativos");
    const [typeFilter, setTypeFilter] = useState<"revenda" | "utilizacao" | "todos">("revenda");
    const [originFilter, setOriginFilter] = useState<"Instagram"| "Facebook" | "Google" | "todos">("todos");
    const [totais, setTotais] = useState<LeadsTotais | null>(null);
    const [page, setPage] = useState(1);
    const [busca, setBusca] = useState("");
    const [delayBusca, setDelayBusca] = useState("");
    const [totaisError, setTotaisError] = useState(false);

    const { leads, loading, error: leadsError, refetch } = useLeadsPolling({
        page,
        limit: ITEMS_FOR_PAGE,
        status: statusFilter === "ativos" ? "ativo" : "concluido",
        interesse: typeFilter !== "todos" ? typeFilter : undefined,
        fonte: originFilter !== "todos" ? originFilter : undefined,
        busca: delayBusca,
    });
    const error = leadsError || totaisError;

    useEffect(() => {
        const handler = setTimeout(() => (setDelayBusca(busca) ), 200);
        return () => clearTimeout(handler);
    }, [busca]);


    const fetchTotais = useCallback(() => {
        setTotaisError(false);
        const statusParam = statusFilter === "ativos" ? "ativo" : "concluido";
        const interesseParam = typeFilter !== "todos" ? typeFilter : undefined;
        const fonteParam = originFilter !== "todos" ? originFilter : undefined;

        return getLeadsTotais({
            page: 1,
            limit: ITEMS_FOR_PAGE,
            status: statusParam,
            interesse: interesseParam,
            fonte: fonteParam,
            busca: delayBusca,
        })
            .then(setTotais)
            .catch((err) => {
                console.error("Erro ao buscar totais:", err);
                setTotaisError(true);
                setTotais(null);
            });
    }, [statusFilter, typeFilter, originFilter, delayBusca]);

    useEffect(() => {
        fetchTotais();
        const id = setInterval(fetchTotais, 5000);
        return () => clearInterval(id);
    }, [fetchTotais]);

    useEffect(() => {
        setPage(1);
    }, [statusFilter, typeFilter, originFilter,delayBusca]);


    const handleUpdateLead = () => {
        refetch();
        fetchTotais();
    };

    return (
        <main className="p-10">
            <div className="flex flex-col">
                <h1 className="mb-2 text-4xl font-bold">Leads</h1>
                <h3 className="text-gray-500 text-lg mb-3">Gerencie e vizualize todas as leads</h3>
            </div>
            <div className="flex flex-wrap justify-between">
                <LeadCard
                    title={statusFilter === "ativos" ? "Leads Ativos" : "Leads Concluídos"}
                    value={totais?.totalStatus ?? 0}
                    icon={Users2}
                />

                <LeadCard
                    title="Leads Revenda"
                    value={totais?.totalRevenda ?? 0}
                    icon={UserCheck}
                />

                <LeadCard
                    title="Leads Utilização"
                    value={totais?.totalUtilizacao ?? 0}
                    icon={Handshake}
                />

                {/* Container branco com informações */}
                <div className="w-full mt-10 mx-auto rounded-xl border shadow-sm bg-white">
                    {/* Filtro de status */}
                    <div className="p-6">
                        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
                    </div>
                    {/* Filtros */}
                    <div className="flex flex-wrap gap-4 p-6">
                        <SearchFilter placeholder="Buscar por nome..." value={busca} onChange={setBusca}/>
                        <OriginFilter value={originFilter} onChange={setOriginFilter} />
                        <TypesFilter value={typeFilter} onChange ={setTypeFilter} />
                    </div>
                    {/* Título e subtítulo */}
                    <div className="pl-6 pt-6 pb-6">
                        <h2 className="pb-1 text-2xl font-bold">{totais?.totalGeral ?? leads.length} Leads</h2>
                        <h3 className="text-gray-500 text-l">Todas as leads registradas</h3>
                    </div>
                    {/* Cabeçalho da tabela */}
                    <div className="p-6">
                        <LeadsHeader showParceiro={typeFilter !== "revenda"} />
                    </div>
                    {/* Lista de leads */}
                    <div className="flex flex-col gap-y-3 p-6 pt-1">
                        {loading ? (
                            <LeadsLoading />
                        ) : error ? (
                            <LeadsError />
                        ) : leads.length === 0 ? (
                            <NoLeadsFound />
                        ) : (
                            leads.map((lead) => (
                                <LeadRow
                                    key={lead.id_leads_comercial}
                                    lead={lead}
                                    onUpdate={handleUpdateLead}
                                    showParceiro={typeFilter !== "revenda"}
                                />
                            ))
                        )}
                        <div>
                            <PaginationControls
                            page={page}
                            totalPages={Math.max(1, totais?.totalPaginas ?? 0)}
                            onPageChange={setPage}
                            className="px-6 pb-6"
                        />
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
