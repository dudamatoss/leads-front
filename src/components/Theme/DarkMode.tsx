"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DarkMode() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const isDarkMode = stored === "dark";
        document.documentElement.classList.toggle("dark", isDarkMode);
        setIsDark(isDarkMode);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
        setIsDark(next);
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="border-1">
            <Sun className={`h-8 w-8 transition-all ${isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} />
            <Moon className={`absolute h-8 w-8 transition-all ${isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
