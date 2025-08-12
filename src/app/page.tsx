"use client";

import { useEffect, useState } from "react";
import { LeadRow } from "@/components/LeadsRow/LeadRow";
import { LeadCard } from "@/components/Cards/LeadCard";
import { StatusFilter } from "@/components/Filters/StatusFilter";
import { SearchFilter } from "@/components/Filters/SeaechFilter";
import {OriginFilter, TypesFilter} from "@/components/Filters/DropDownFilter";
import { LeadsHeader } from "@/components/LeadsRow/LeadsHeader";
import {getLeads, getLeadsTotais} from "@/lib/services/get-leads";
import {LeadsTotais, LeadType} from "@/schemas/leads-schemas";
import {Handshake, UserCheck, Users2} from "lucide-react";
import {PaginationControls} from "@/components/Pagination/Pagination";

const ITEMS_FOR_PAGE = 8;

export default function Home() {
    const [leads, setLeads] = useState<LeadType[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<"ativos" | "concluidos">("ativos");
    const [typeFilter, setTypeFilter] = useState<"revenda" | "utilizacao" | "todos">("revenda");
    const [originFilter, setOriginFilter] = useState<"Instagram"| "Facebook" | "Google" | "todos">("todos");
    const [totais, setTotais] = useState<LeadsTotais | null>(null);
    const [page, setPage] = useState(1);
    const [busca, setBusca] = useState("");


    useEffect(() => {
        const statusParam = statusFilter === "ativos" ? "ativo" : "concluido";
        const interesseParam = typeFilter !== "todos" ? typeFilter : undefined;
        const fonteParam = originFilter !== "todos" ? originFilter : undefined;

        getLeadsTotais({
            page: 1,
            limit: ITEMS_FOR_PAGE,
            status: statusParam,
            interesse: interesseParam,
            fonte: fonteParam,
            busca,
        })
            .then(setTotais)
            .catch((err) => console.error("Erro ao buscar totais:", err));
    }, [statusFilter, typeFilter, originFilter,busca]);

    useEffect(() => {
        setPage(1);
    }, [statusFilter, typeFilter, originFilter,busca]);

    useEffect(() => {
        setLoading(true);

        getLeads({
            page,
            limit: ITEMS_FOR_PAGE,
            status: statusFilter === "ativos" ? "ativo" : "concluido",
            interesse: typeFilter !== "todos" ? typeFilter : undefined,
            fonte: originFilter !== "todos" ? originFilter : undefined,
            busca,
        })
            .then(setLeads)
            .catch((err) => console.error("Erro ao buscar leads:", err))
            .finally(() => setLoading(false));
    }, [statusFilter, typeFilter, originFilter, page, busca]);

    return (
        <main className="p-10">
            <div className="flex flex-col">
                <h1 className="mb-2 text-4xl font-bold">Leads</h1>
                <h3 className="text-gray-500 text-lg mb-3">Gerencie e vizualize todas as leads</h3>
            </div>
            <div className="flex flex-wrap justify-between">
                <LeadCard
                    title="Leads Ativos"
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
                        <LeadsHeader />
                    </div>
                    {/* Lista de leads */}
                    <div className="flex flex-col gap-y-3 p-6 pt-1">
                        {loading ? (
                            <p>Carregando...</p>
                        ) : leads.length === 0 ? (
                            <p className="text-gray-500">Nenhuma lead encontrada.</p>
                        ) : (
                            leads.map((lead) => (
                                <LeadRow key={lead.id_leads_comercial} lead={lead} />
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
