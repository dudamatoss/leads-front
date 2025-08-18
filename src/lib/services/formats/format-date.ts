export function formatDate(date_hora: string): string {
    let dateString = date_hora;
    if (!date_hora.includes("T")) {
        if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(?::\d{2})?$/.test(date_hora)) {
            dateString = date_hora.replace(" ", "T");
        } else {
            dateString = `${date_hora}T00:00:00`;
        }
    }
    const isUTC = /Z|[+-]\d{2}:\d{2}$/.test(dateString);
    const date = new Date(dateString);
    const dateOptions: Intl.DateTimeFormatOptions | undefined =
        isUTC ? { timeZone: "UTC" } : undefined;
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        ...(isUTC ? { timeZone: "UTC" } : {}),
    };
    return `${date.toLocaleDateString("pt-BR", dateOptions)} ${date.toLocaleTimeString(
        "pt-BR",
        timeOptions,
    )}`;
}