"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("system");
    const itemClass =
        "relative data-[state=on]:bg-transparent data-[state=on]:text-orange-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:content-[''] after:bg-transparent data-[state=on]:after:bg-orange-500";

    useEffect(() => {
        const stored = (localStorage.getItem("theme") as Theme) || "system";
        setTheme(stored);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const apply = () => {
            const resolved = theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme;
            document.documentElement.classList.toggle("dark", resolved === "dark");
        };
        apply();
        mediaQuery.addEventListener("change", apply);
        return () => mediaQuery.removeEventListener("change", apply);
    }, [theme]);

    const handleChange = (value: string) => {
        if (!value) return;
        const next = value as Theme;
        setTheme(next);
        localStorage.setItem("theme", next);
    };

    return (
        <ToggleGroup type="single" value={theme} onValueChange={handleChange} variant="outline">
            <ToggleGroupItem value="light" aria-label="Tema claro" className={itemClass}>
                <Sun className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Tema escuro" className={itemClass}>
                <Moon className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="system" aria-label="Usar tema do sistema" className={itemClass}>
                <Monitor className="h-5 w-5" />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}