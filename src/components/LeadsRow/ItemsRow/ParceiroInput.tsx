"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { SquareCheck, Pencil } from "lucide-react";

interface PutInputProps {
    initialValue: string;
    onConfirm: (value: string) => Promise<void>;
    placeholder?: string;
    inputClassName?: string;
}

export function ParceiroInput({initialValue, onConfirm, placeholder = "Digite...", inputClassName = "",}: PutInputProps) {
    const [value, setValue] = useState(initialValue);
    const [isPut, setIsPut] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);


    const hasChanged = value.trim() !== initialValue.trim();

    const handleConfirm = async () => {
        try {
            await onConfirm(value.trim());
        } catch (error) {
            console.error("Erro ao confirmar edição:", error);
        } finally {
            setIsPut(false);
        }
    };

    const handleBlur = () => {

        if (hasChanged) {
            handleConfirm();
        } else {
            setIsPut(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Input
                ref={inputRef}
                value={value}
                placeholder={placeholder}
                readOnly={!isPut}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                className={`h-7 w-[140px] text-sm py-1 px-2 focus-visible:border-orange-500 focus-visible:ring-orange-300 focus-visible:ring-1 ${inputClassName} ${
                    !isPut ? "bg-muted cursor-not-allowed" : ""
                }`}
            />
            {!isPut && (
                <button
                    type="button"
                    onClick={() => {
                        setIsPut(true);
                        setTimeout(() => inputRef.current?.focus(), 0);
                    }}
                    className="text-orange-500 hover:text-orange-700"
                >
                    <Pencil size={18} />
                </button>
            )}


            {isPut && hasChanged && (
                <button
                    type="button"
                    onClick={handleConfirm}
                    className="text-green-500 hover:text-green-700"
                >
                    <SquareCheck size={20} />
                </button>
            )}
        </div>
    );
}
