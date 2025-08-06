"use client";

import { Copy, BadgeCheck } from "lucide-react";
import { useState } from "react";

interface CopyableTextProps {
    text: string;
    className?: string;
}

export function CopyableText({ text, className }: CopyableTextProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        });
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span>{text}</span>
            <span
                className="relative w-4 h-4"
                onClick={handleCopy}
                role="button"
                title="Copiar"
            >
        {/* Ícone Copy */}
                <Copy
                    className={`absolute top-0 left-0 w-4 h-4 text-muted-foreground transition-all duration-300 ease-in-out 
            ${copied ? "opacity-0 scale-75" : "opacity-100 scale-100 cursor-pointer"}`}
                />
                {/* Ícone Check */}
                <BadgeCheck
                    className={`absolute top-0 left-0 w-4 h-4 text-green-600 transition-all duration-300 ease-in-out 
            ${copied ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                />
      </span>
        </div>
    );
}
