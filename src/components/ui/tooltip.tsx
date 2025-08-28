
"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    className?: string;
    contentClassName?: string;
}

export function Tooltip({ children, content, className, contentClassName }: TooltipProps) {
    return (
        <div className={cn("group relative", className)}>
            {children}
            {content && (
                <div
                    className={cn(
                        "pointer-events-none absolute left-1/2 bottom-full z-50 mb-1 max-w-xs -translate-x-1/2 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground break-words opacity-0 transition-opacity group-hover:opacity-100",
                        contentClassName
                    )}
                >
                    {content}

                </div>
            )}
        </div>
    );
}