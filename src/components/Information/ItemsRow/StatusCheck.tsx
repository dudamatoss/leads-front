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
    const textColor = StatusAtivo ? "text-green-600" : "text-orange-500";
    const hoverColor = StatusAtivo ? "hover:bg-green-100 hover:text-green-600" : "hover:bg-orange-100 hover:text-orange-500";

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
