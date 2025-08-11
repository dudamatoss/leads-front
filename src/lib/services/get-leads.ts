import {LeadsTotais, LeadType} from "@/schemas/leads-schemas";
import apiLead from "@/api/api-leads";



interface GetLeadsParams {
    page: number;
    limit: number;
    status?: string;
    interesse?: string;
    fonte?: string;
    busca?: string;

}

export async function getLeads({page,... params}: GetLeadsParams): Promise<LeadType[]> {
    const response = await apiLead.get<LeadType[]>("/leads/filtro", {
        params: { ...params, page: Math.max(1, page) },
    });
    return response.data;
}




export async function getLeadsTotais({page, ... params}: GetLeadsParams): Promise<LeadsTotais> {
    const response = await apiLead.get<LeadsTotais>("/leads/totais", {
        params: { ...params, page: Math.max(1, page) },
    });
    return response.data;
}
