import apiLead from "@/api/api-leads";
import { LeadType } from "@/schemas/leads-schemas";

export async function putLead(data: Partial<LeadType>): Promise<LeadType> {
    const response = await apiLead.put<LeadType>("/leads", data);
    return response.data;
}
