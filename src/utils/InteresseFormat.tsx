export function formatInteresse(value: "revenda" | "utilizacao"): string {
            return value;
    }


export function normalizeInteresse(value?: string): "revenda" | "utilizacao" {
    if (!value) return "utilizacao";

    const val = value.trim().toLowerCase();

    if (val === "revenda") return "revenda";
    if (val === "utilização" || val === "utilizacao") return "utilizacao";

    return "utilizacao";
}