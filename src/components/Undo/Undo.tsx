"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from "react";
import { RotateCcw } from "lucide-react";


interface UndoContextValue {
    showUndo: (action: () => void | Promise<void>) => void;
}

const UndoContext = createContext<UndoContextValue | undefined>(undefined);

export function Undo({children}: {children: ReactNode}) {
    const [undoAction, setUndoAction] = useState<(() => void | Promise<void>) | null>(null);
    const timeRef = useRef<NodeJS.Timeout | null>(null);
    const showUndo = (action: () => void | Promise<void>) => {
        setUndoAction(() => action);
        if (timeRef.current) clearTimeout(timeRef.current);
        timeRef.current = setTimeout(() => setUndoAction(null), 5000);
    };
    const handleUndo = useCallback(() => {
        if (undoAction) {
            undoAction();
        }
        setUndoAction(null);
        if (timeRef.current) clearTimeout(timeRef.current);
    }, [undoAction]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z" && undoAction) {
                event.preventDefault();
                handleUndo();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleUndo, undoAction]);

    useEffect(() => {
        return () => {
            if (timeRef.current) clearTimeout(timeRef.current);
        };
    }, []);

    return (
        <UndoContext.Provider value={{ showUndo }}>
            {children}
            {undoAction && (
                <button
                    onClick={handleUndo}
                    className="
    fixed bottom-6 right-6 z-50
    inline-flex items-center gap-2 rounded-lg
    px-5 py-3 text-sm font-medium
    bg-orange-500 text-white
    shadow-lg hover:shadow-xl
    hover:bg-orange-600
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300
    active:scale-95 transition-all
  "
                >
                    <RotateCcw className="h-5 w-5" />
                    <span className="flex flex-col leading-tight ">
                        <span>Desfazer Alterações <span className="self-end text-xs text-white/80 pl-4">Ctrl + Z</span></span>

                    </span>
                </button>
            )}
        </UndoContext.Provider>
    );
}

export function useUndo() {
    const context = useContext(UndoContext);
    if (!context) {
        throw new Error("useUndo deve ser usado dentro de um UndoProvider");
    }
    return context.showUndo;
}