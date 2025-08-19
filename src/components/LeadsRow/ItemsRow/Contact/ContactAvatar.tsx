"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ContactAvatarProps {
    name: string | null | undefined;
    interesse: "revenda" | "utilizacao";
}

export function ContactAvatar({ name, interesse }: ContactAvatarProps) {
    const initials = (() => {
        const n = (name ?? "").trim();
        if (!n) return "--";
        const parts = n.split(/\s+/).filter(Boolean);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    })();

    return (
        <Avatar className="h-9 w-9">
            <AvatarFallback
                className={cn(
                    "text-white font-semibold text-xs",
                    interesse === "revenda"
                        ? "bg-[var(--color-primary-80)]"
                        : "bg-[var(--color-purple-80)]"
                )}
            >
                {initials}
            </AvatarFallback>
        </Avatar>
    );
}