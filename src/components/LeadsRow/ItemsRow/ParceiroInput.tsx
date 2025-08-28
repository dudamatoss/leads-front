"use client";

import { useState, useRef, type KeyboardEvent, useEffect } from "react";
import { SquareCheck, Pencil } from "lucide-react";
import { CopyableText } from "@/components/Copy/CopyText";
import { Input } from "@/components/ui/input";

interface ParceiroInputProps {
    initialValue: string;
    onConfirm: (value: string) => Promise<void>;
    placeholder?: string;
    inputClassName?: string;
}

const INPUT_HEIGHT = 28;
const MAX_LENGTH = 50;

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

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
        <div className="flex items-center gap-2 w-[140px]">
            {isEditing ? (
                <Input
                    ref={inputRef}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    maxLength={MAX_LENGTH}
                    style={{ height: INPUT_HEIGHT }}
                    className={`w-full h-[28px] truncate text-sm leading-tight py-1 px-2 bg-muted border border-transparent rounded-md ${inputClassName}`}
                />
            ) : (
                <CopyableText
                    text={value}
                    className={`w-full h-[28px] text-sm leading-tight py-1 px-2 bg-muted border border-transparent rounded-md ${inputClassName}`}
                    textClassName="truncate"
                    title={value}
                >
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(true);
                            setTimeout(() => inputRef.current?.focus(), 0);
                        }}
                        className="text-[var(--muted-foreground)] hover:text-[var(--color-primary-500)]"
                    >
                        <Pencil size={18} />
                    </button>
                </CopyableText>
            )}
            {isEditing &&
                hasChanged && (
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleConfirm}
                        className="text-[var(--color-success-500)] hover:text-[var(--color-success-700)]"
                    >
                        <SquareCheck size={20} />
                    </button>
            )}
        </div>
    );
}