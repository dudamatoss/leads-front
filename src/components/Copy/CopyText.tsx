"use client";

import { Copy, BadgeCheck } from "lucide-react";
import { useState } from "react";

interface CopyableTextProps {
    text: string;
    className?: string;
    title?: string; textClassName?: string;
}

export function CopyableText({ text, className, title, textClassName = "truncate" }: CopyableTextProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
            });
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                document.execCommand("copy");
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
            } catch (err) {
                console.error("Failed to copy text", err);
            } finally {
                document.body.removeChild(textarea);
            }
        }
    };

    return (
        <div className={`flex items-center gap-2 min-w-0 ${className}`}>
            <span className={`flex-1 ${textClassName}`} title={title ?? text}>{text}</span>
            <span
                className="relative w-4 h-4"
                onClick={handleCopy}
                role="button"
                title="Copiar"
            >
        {/* icone de copiar  */}
                <Copy
                    className={`absolute top-0 left-0 w-4 h-4 text-muted-foreground transition-all duration-300 ease-in-out 
            ${copied ? "opacity-0 scale-75" : "opacity-100 scale-100 cursor-pointer"}`}
                />
                {/* icone de quando o texto foi copiado */}
                <BadgeCheck
                    className={`absolute top-0 left-0 w-4 h-4 text-[var(--color-success-600)] transition-all duration-300 ease-in-out
            ${copied ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                />
      </span>
        </div>
    );
}