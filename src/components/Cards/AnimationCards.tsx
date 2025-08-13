import { useEffect, useState } from "react";

interface AnimationCardsProps {
    value: number;
    duration?: number;
    className?: string;
}

export function AnimationCards({ value, duration = 200, className }: AnimationCardsProps) {
    const [displayValue, setDisplayValue] = useState(value);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (value === displayValue) return;
        setVisible(false);
        const timeout = setTimeout(() => {
            setDisplayValue(value);
            setVisible(true);
        }, duration);
        return () => clearTimeout(timeout);
    }, [value, displayValue, duration]);

    return (
        <span
            className={`inline-block transition-all ${className ?? ""}`}
            style={{
                transitionDuration: `${duration}ms`,
                opacity: visible ? 1 : 0,
                filter: visible ? "blur(0px)" : "blur(4px)",
            }}
        >
            {displayValue}
        </span>
    );
}

