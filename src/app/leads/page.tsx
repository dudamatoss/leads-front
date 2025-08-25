"use client";

import {useEffect, useState, useCallback} from "react";
import {LeadRow} from "@/components/LeadsRow/LeadRow";
import {LeadCard} from "@/components/Cards/LeadCard";
import {StatusFilter} from "@/components/Filters/StatusFilter";
import {SearchFilter} from "@/components/Filters/SeaechFilter";
import {OriginFilter, TypesFilter} from "@/components/Filters/DropDownFilter";
import {LeadsHeader} from "@/components/LeadsRow/LeadsHeader";
import {getLeadsTotais} from "@/lib/services/get-leads";
import {LeadsTotais} from "@/schemas/leads-schemas";
import {Handshake, UserCheck, Users2} from "lucide-react";
import {PaginationControls} from "@/components/Pagination/Pagination";
import {NoLeadsFound} from "@/components/LeadsRow/NoticeLeads/NoLeadsFound";
import {LeadsError} from "@/components/LeadsRow/NoticeLeads/LeadsError";
import {LeadsLoading} from "@/components/LeadsRow/LeadsLoading";
import {useLeadsPolling} from "@/hooks/useLeads";
import {ThemeToggle} from "@/components/Theme/ThemeToggle";
import {LEADS_FOR_PAGE, POLLING_INTERVAL} from "@/lib/config";




export default function Home() {
    const [statusFilter, setStatusFilter] = useState<"ativos" | "concluidos">("ativos");
    const [typeFilter, setTypeFilter] = useState<"revenda" | "utilizacao" | "todos">("revenda");
    const [originFilter, setOriginFilter] = useState<"Instagram" | "Facebook" | "Google" | "todos">("todos");
    const [totais, setTotais] = useState<LeadsTotais | null>(null);
    const [page, setPage] = useState(1);
    const [busca, setBusca] = useState("");
    const [delayBusca, setDelayBusca] = useState("");
    const [totaisError, setTotaisError] = useState(false);

    const {leads, loading, error: leadsError, refetch, totalPages} = useLeadsPolling({
        page,
        limit: LEADS_FOR_PAGE,
        status: statusFilter === "ativos" ? "ativo" : "concluido",
        interesse: typeFilter !== "todos" ? typeFilter : undefined,
        fonte: originFilter !== "todos" ? originFilter : undefined,
        busca: delayBusca,
    });
    const error = leadsError || totaisError;

    useEffect(() => {
        const handler = setTimeout(() => (setDelayBusca(busca)), 200);
        return () => clearTimeout(handler);
    }, [busca]);


    const fetchTotais = useCallback(() => {
        setTotaisError(false);
        const statusParam = statusFilter === "ativos" ? "ativo" : "concluido";
        const interesseParam = typeFilter !== "todos" ? typeFilter : undefined;
        const fonteParam = originFilter !== "todos" ? originFilter : undefined;

        return getLeadsTotais({
            page: 1,
            limit: LEADS_FOR_PAGE,
            status: statusParam,
            interesse: interesseParam

        })
            .then(setTotais)
            .catch((err) => {
                console.error("Erro ao buscar totais:", err);
                setTotaisError(true);
                setTotais(null);
            });
    }, [statusFilter, typeFilter, originFilter, delayBusca]);

    useEffect(() => {
        if (leadsError || totaisError) return;
        fetchTotais();
        const id = setInterval(fetchTotais, POLLING_INTERVAL);
        return () => clearInterval(id);
    }, [fetchTotais, leadsError, totaisError]);

    useEffect(() => {
        setPage(1);
    }, [statusFilter, typeFilter, originFilter, delayBusca]);


    const handleUpdateLead = () => {
        refetch();
        fetchTotais();
    };
    const isTotaisLoading = totais === null && !totaisError;

    return (
        <main className="p-4 md:p-10">
            <header className="flex items-center justify-between gap-4 mb-8">
                <div className="min-w-0">
                    <h1 className="text-4xl font-bold leading-tight">Leads</h1>
                    <h3 className="text-muted-foreground text-lg">
                        Gerencie e vizualize todas as leads
                    </h3>
                </div>

                <div className="shrink-0">
                    <ThemeToggle/>
                </div>
            </header>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <LeadCard
                    title={statusFilter === "ativos" ? "Leads Ativos" : "Leads Concluídos"}
                    value={totais?.totalStatus ?? 0}
                    icon={Users2}
                    loading={isTotaisLoading}
                />

                <LeadCard
                    title={statusFilter === "ativos" ? "Leads de Revenda Ativos " : "Leads de Revenda Concluídos"}
                    value={totais?.totalRevenda ?? 0}
                    icon={Handshake}
                    loading={isTotaisLoading}
                />

                <LeadCard
                    title={statusFilter === "ativos" ? "Leads de Utilização Ativos" : "Leads de Utilização Concluídos"}
                    value={totais?.totalUtilizacao ?? 0}
                    icon={UserCheck}
                    loading={isTotaisLoading}
                />

                <div className="w-full mt-10 mx-auto rounded-xl border shadow-sm bg-card sm:col-span-2 lg:col-span-3">
                    {/* Filtro de status */}
                    <div className="p-6">
                        <StatusFilter value={statusFilter} onChange={setStatusFilter}/>
                    </div>
                    {/* Filtros */}
                    <div className="flex flex-wrap gap-4 p-6">
                        <SearchFilter placeholder="Buscar por nome ou data..." value={busca} onChange={setBusca}/>
                        <OriginFilter value={originFilter} onChange={setOriginFilter}/>
                        <TypesFilter value={typeFilter} onChange={setTypeFilter}/>
                    </div>
                    {/* Cabeçalho da tabela */}
                    <div className="p-6">
                        <LeadsHeader showParceiro={typeFilter !== "revenda"}/>
                    </div>
                    {/* Lista de leads */}
                    <div className="flex flex-col gap-y-3 p-6 pt-1">
                        {loading ? (
                            <LeadsLoading/>
                        ) : error ? (
                            <LeadsError/>
                        ) : leads.length === 0 ? (
                            <NoLeadsFound/>
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
                        {!loading && !error && leads.length > 0 && (

                            <div>
                                <PaginationControls
                                    page={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                    className="px-6 pb-6"
                                />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}
