"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SquareCheck } from "lucide-react";

interface PutInputProps {
    initialValue: string;
    onConfirm: (value: string) => Promise<void>;
    placeholder?: string;
    inputClassName?: string;
}

export function ParceiroInput({initialValue, onConfirm, placeholder = "Digite...", inputClassName = "",}: PutInputProps) {
    const [value, setValue] = useState(initialValue);
    const [isPut, setIsPut] = useState(false);
    const hasChanged = value.trim() !== initialValue.trim();

    
    const ConfirmPut = async () => {
        try {
            await onConfirm(value.trim());
            setIsPut(false);
        } catch (error) {
            console.error("Erro ao confirmar edição:", error);
        }
    };

    return (
        <div className="relative flex items-center gap-1">
            <Input
                value={value}
                placeholder={placeholder}
                onFocus={() => setIsPut(true)}
                onChange={(e) => setValue(e.target.value)}
                className={`h-7 w-[140px] text-sm  py-1 pr-7 focus-visible:border-orange-500 focus-visible:ring-orange-300 focus-visible:ring-1 ${inputClassName}`}
            />
            {isPut && hasChanged && (
                <button
                    type="button"
                    onClick={ConfirmPut}
                    className="absolute right-[3px] text-green-500 hover:text-green-700"
                >
                    <SquareCheck size={22} />
                </button>
            )}
        </div>
    );
}
