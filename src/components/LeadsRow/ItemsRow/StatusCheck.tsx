import { RotateCcw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatusButtonProps {
    status: "ativo" | "concluido";
    onClick: () => void;
}

export function StatusButton({ status, onClick }: StatusButtonProps) {
    const StatusAtivo = status === "ativo";

    const icon = StatusAtivo ? <CheckCircle className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />;
    const label = StatusAtivo ? "Concluir" : "Tornar Ativo";
    const textColor = StatusAtivo ? "text-[var(--color-success-600)]" : "text-[var(--color-primary-500)]";
    const hoverColor = StatusAtivo
        ? "hover:bg-[var(--color-success-100)] hover:text-[var(--color-success-600)]"
        : "hover:bg-[var(--color-primary-100)] hover:text-[var(--color-primary-500)]";
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            className={`px-3 py-3 h-8 text-sm rounded-md flex items-center gap-2 transition-colors w-fit ${textColor} ${hoverColor}`}>
            {icon}
            {label}
        </Button>
    );
}
