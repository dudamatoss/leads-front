"use client";

import { useState, useRef, type KeyboardEvent, useEffect } from "react";
import { Textarea } from "@/components/ui/inputarea";
import { SquareCheck, Pencil } from "lucide-react";
import { CopyableText } from "@/components/Copy/CopyText";

interface ParceiroInputProps {
    initialValue: string;
    onConfirm: (value: string) => Promise<void>;
    placeholder?: string;
    inputClassName?: string;
}

const INPUT_HEIGHT = 28; // px

export function ParceiroInput({
                                  initialValue,
                                  onConfirm,
                                  placeholder = "Digite...",
                                  inputClassName = "",
                              }: ParceiroInputProps) {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);
    const [confirmedValue, setConfirmedValue] = useState(initialValue);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setValue(initialValue);
        setConfirmedValue(initialValue);
    }, [initialValue]);

    const hasChanged = value.trim() !== confirmedValue.trim();

    const handleConfirm = async () => {
        try {
            await onConfirm(value.trim());
            setConfirmedValue(value.trim());
        } catch (error) {
            console.error("Erro ao confirmar edição:", error);
        } finally {
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        if (hasChanged) {
            setValue(confirmedValue);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (hasChanged) {
                handleConfirm();
            } else {
                setIsEditing(false);
            }
        }
    };

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <Textarea
                    ref={inputRef}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    style={{ height: INPUT_HEIGHT }}
                    className={`w-[140px] text-sm leading-tight py-1 px-2 overflow-y-auto scrollbar-muted resize-none break-words focus-visible:border-[var(--color-primary-500)] focus-visible:ring-[var(--color-primary-300)] focus-visible:ring-1 ${inputClassName}`}
                />
            ) : (
                <CopyableText
                    text={value}
                    className={`w-[140px] h-[28px] text-sm leading-tight py-1 px-2 bg-muted border border-transparent rounded items-start ${inputClassName}`}
                    textClassName="break-words overflow-y-auto scrollbar-muted max-h-[28px]"
                    title={value}
                />
            )}
            {isEditing ? (
                hasChanged && (
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleConfirm}
                        className="text-[var(--color-success-500)] hover:text-[var(--color-success-700)]"
                    >
                        <SquareCheck size={20} />
                    </button>
                )
            ) : (
                <button
                    type="button"
                    onClick={() => {
                        setIsEditing(true);
                        setTimeout(() => inputRef.current?.focus(), 0);
                    }}
                    className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-700)]"
                >
                    <Pencil size={18} />
                </button>
            )}
        </div>
    );
}