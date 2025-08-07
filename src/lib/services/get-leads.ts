import {LeadsTotais, LeadType} from "@/schemas/leads-schemas";
import apiLead from "@/api/api-leads";



interface GetLeadsParams {
    page: number;
    limit: number;
    status?: string;
    interesse?: string;
    fonte?: string;

}

export async function getLeads(params: GetLeadsParams): Promise<LeadType[]> {
    const response = await apiLead.get<LeadType[]>("/leads/filtro", {
        params,
    });
    return response.data;
}




export async function getLeadsTotais(params?: GetLeadsParams): Promise<LeadsTotais> {
    const response = await apiLead.get<LeadsTotais>("/leads/totais", {
        params,
    });
    return response.data;
}
