"use client";

import { useEffect, useState } from "react";
import { LeadRow } from "@/components/Information/LeadRow";
import { LeadCard } from "@/components/Cards/lead-card";
import { StatusFilter } from "@/components/Filters/StatusFilter";
import { SearchFilter } from "@/components/Filters/SeaechFilter";
import {OriginFilter, TypesFilter} from "@/components/Filters/DropDownFilter";
import { LeadsHeader } from "@/components/Information/LeadsHeader";
import {getLeads} from "@/lib/services/get-leads";
import {LeadType} from "@/schemas/leads-schemas";

export default function Home() {
    const [leads, setLeads] = useState<LeadType[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<"ativos" | "concluidos">("ativos");
    const [typeFilter, setTypeFilter] = useState<"revenda" | "utilizacao" | "todos">("revenda");

    useEffect(() => {
        setLoading(true);

        getLeads({
            page: 1,
            limit: 8,
            status: statusFilter === "ativos" ? "pendente" : "concluido",
            interesse: typeFilter !== "todos" ? typeFilter : undefined,
        })
            .then(setLeads)
            .catch((err) => console.error("Erro ao buscar leads:", err))
            .finally(() => setLoading(false));
    }, [statusFilter, typeFilter]);

    return (
        <main className="p-10">
            <div className="flex flex-col">
                <h1 className="mb-2 text-4xl font-bold">Leads</h1>
                <h3 className="text-gray-500 text-lg mb-3">Gerencie e vizualize todas as leads</h3>
            </div>

            <div className="flex flex-wrap justify-between">
                <LeadCard />
                <LeadCard />
                <LeadCard />
                {/* Container branco com informações */}
                <div className="w-full mt-10 mx-auto rounded-xl border shadow-sm bg-white">
                    {/* Filtro de status */}
                    <div className="p-6">
                        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
                    </div>

                    {/* Filtros */}
                    <div className="flex flex-wrap gap-4 p-6">
                        <SearchFilter placeholder="Buscar por nome..." />
                        <OriginFilter />
                        <TypesFilter value={typeFilter} onChange ={setTypeFilter} />
                    </div>

                    {/* Título e subtítulo */}
                    <div className="pl-6 pt-6 pb-6">
                        <h2 className="pb-1 text-2xl font-bold">{leads.length} Leads</h2>
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
                    </div>
                </div>
            </div>
        </main>
    );
}
