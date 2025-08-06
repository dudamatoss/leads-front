import apiLead from "@/api/api-leads";
import {LeadType} from "@/schemas/leads-schemas";


export async function getLeads(): Promise<LeadType[]> {
    const response = await apiLead.get<LeadType[]>("/leads/filtro");
    return response.data;
}