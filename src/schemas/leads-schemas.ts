import { z } from "zod";

export const LeadSchema = z.object({
    id_leads_comercial: z.number(),
    nome: z.string(),
    email: z.string().email(),
    telefone: z.string(),
    cnpj: z.string(),
    interesse: z.string(),
    status: z.string(),
    parceiro: z.string(),
    fonte: z.string(),
    meio: z.string(),
    anuncio: z.string(),
    data_hora: z.string(),
});

export type LeadType = z.infer<typeof LeadSchema>;