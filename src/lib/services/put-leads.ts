import apiLead from "@/api/api-leads";
import {LeadType} from "@/schemas/leads-schemas";

export async function putLeads(): Promise<LeadType[]> {
    const response = await apiLead.put<LeadType[]>("/leads");

    return response.data;
}