import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import {AnimationCards} from "@/components/Cards/AnimationCards";
import { Skeleton} from "@/components/ui/skeleton";

interface LeadCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    loading?: boolean;
}

export function LeadCard({ title, value, icon: Icon, loading }: LeadCardProps) {
    return (
        <Card className="w-full shadow-sm rounded-xl">
            <CardContent className="p-6 flex flex-row justify-between items-center">
                {/* Texto à esquerda */}
                <div>
                    <p className="text-lg text-muted-foreground font-medium">{title}</p>
                    <h2 className="text-4xl font-bold text-foreground mt-2">
                        {loading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <AnimationCards value={value} />
                        )}
                    </h2>
                </div>

                {/* Ícone à direita */}
                <div className="p-2 rounded-md bg-orange-500/30 text-orange-500">
                    <Icon className="w-6 h-6" />
                </div>
            </CardContent>
        </Card>
    );
}
