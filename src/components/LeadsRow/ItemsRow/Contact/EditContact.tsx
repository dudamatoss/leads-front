"use client";

import {useState, useRef, useEffect, type KeyboardEvent} from "react";
import {Input} from "@/components/ui/input";
import {CopyableText} from "@/components/Copy/CopyText";
import {SquareCheck, Pencil} from "lucide-react";

interface EditContactProps {
    initialValue: string;
    onConfirm: (value: string) => Promise<void>;
    placeholder?: string;
    className?: string;
    textClassName?: string;
    formatter?: (value: string) => string;
}

export function EditContact({
                                         initialValue,
                                         onConfirm,
                                         placeholder = "Digite...",
                                         className = "",
                                         textClassName = "",
                                         formatter,
                                     }: EditContactProps) {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);
    const [confirmedValue, setConfirmedValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const displayValue = formatter ? formatter(confirmedValue) : confirmedValue;

    return (
        <div className="flex items-center gap-3">
            {isEditing ? (
                <Input
                    ref={inputRef}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={`h-7 text-sm ${className}`}
                />
            ) : (
                <CopyableText
                    text={displayValue}
                    className={className}
                    textClassName={textClassName}
                    title={displayValue}
                >
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
