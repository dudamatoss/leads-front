"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ContactAvatarProps {
    name: string | null | undefined;
}

export function ContactAvatar({ name }: ContactAvatarProps) {
    const initials = (() => {
        const n = (name ?? "").trim();
        if (!n) return "--";
        const parts = n.split(/\s+/).filter(Boolean);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    })();

    return (
        <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-orange-500/80 text-white font-semibold text-xs">
                {initials}
            </AvatarFallback>
        </Avatar>
    );
}
