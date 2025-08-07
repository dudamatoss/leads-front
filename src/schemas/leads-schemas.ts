import { z } from "zod";

export const LeadSchema = z.object({
    id_leads_comercial: z.number(),
    nome: z.string(),
    email: z.string(),
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

export const LeadsTotaisSchema = z.object({
    totalAtivos: z.number(),
    totalRevenda: z.number(),
    totalUtilizacao: z.number(),
});

export type LeadsTotais = z.infer<typeof LeadsTotaisSchema>;