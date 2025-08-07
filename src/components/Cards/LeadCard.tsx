import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface LeadCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
}

export function LeadCard({ title, value, icon: Icon }: LeadCardProps) {
    return (
        <Card className="w-full max-w-md shadow-sm rounded-xl">
            <CardContent className="p-6 flex flex-row justify-between items-center">
                {/* Texto à esquerda */}
                <div>
                    <p className="text-lg text-muted-foreground font-medium">{title}</p>
                    <h2 className="text-4xl font-bold text-foreground mt-2">{value}</h2>
                </div>

                {/* Ícone à direita - cor fixa: laranja */}
                <div className="p-2 rounded-md bg-orange-100 text-orange-500">
                    <Icon className="w-6 h-6" />
                </div>
            </CardContent>
        </Card>
    );
}
