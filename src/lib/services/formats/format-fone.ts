export function formatPhone(telefone: string): string {
    let digits = telefone.replace(/\D/g, "");
    if (digits.startsWith("55") && digits.length > 11) {
        digits = digits.slice(2);
    }
    if (digits.length === 11) {
        return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    if (digits.length === 10) {
        return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    }
    return digits;
}