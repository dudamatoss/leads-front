"use client";

import * as React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    scrollTopOnChange?: boolean;
};

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}
function pagesWindow(current: number, total: number, size = 5) {
    const half = Math.floor(size / 2);
    const start = clamp(current - half, 1, Math.max(1, total - size + 1));
    const end = Math.min(total, start + size - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function PaginationControls({
                                       page,
                                       totalPages,
                                       onPageChange,
                                       className,
                                       scrollTopOnChange = true,
                                   }: Props) {
    const go = (p: number) => {
        if (p === page || p < 1 || p > totalPages) return;
        onPageChange(p);
        if (scrollTopOnChange) window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const core = pagesWindow(page, totalPages, 5);
    const showLeftDots = core[0] > 2;
    const showRightDots = core[core.length - 1] < totalPages - 1;

    const PageBtn = ({ p }: { p: number }) => (
        <PaginationItem className="mx-1">
            <PaginationLink
                href="#"
                aria-current={p === page ? "page" : undefined}
                className={cn(
                    // número circular
                    "h-10 w-10 rounded-full grid place-items-center text-sm font-medium no-underline",
                    "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-70)] focus-visible:ring-offset-2",
                    p === page
                        ? "bg-[var(--color-primary-500)] text-white shadow-sm hover:bg-[var(--color-primary-600)]"
                        : "text-foreground/80 hover:text-foreground hover:bg-[var(--color-primary-100)]"
                )}
                onClick={(e) => {
                    e.preventDefault();
                    go(p);
                }}
            >
                {p}
            </PaginationLink>
        </PaginationItem>
    );

    return (
        <div
            className={cn(
                "w-full flex justify-center py-5",
                "mt-4 rounded-xl border bg-card/80 backdrop-blur-sm",
            )}
        >
            <Pagination>
                <PaginationContent className="gap-1 items-center">
                    {/* Anterior */}
                    <PaginationItem className="mx-2">
                        <PaginationLink
                            href="#"
                            aria-disabled={page === 1}
                            className={cn(
                                // retangular/fluid
                                "h-10 w-auto px-4 rounded-lg text-sm font-medium flex items-center gap-2 no-underline",
                                "transition-all hover:bg-[var(--color-primary-light-70)] hover: active:scale-[.90] hover:text-[var(--color-primary-600)]",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-70)] focus-visible:ring-offset-2",
                                page === 1
                                    ? "opacity-50 pointer-events-none"
                                    : "text-[var(--color-primary-600)]"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                go(page - 1);
                            }}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Anterior
                        </PaginationLink>
                    </PaginationItem>

                    {/* primeira + ellipsis esquerda */}
                    {totalPages >= 1 && !core.includes(1) && <PageBtn p={1} />}
                    {showLeftDots && (
                        <PaginationItem className="mx-1">
                            <span className="px-2 text-muted-foreground select-none">…</span>
                        </PaginationItem>
                    )}

                    {/* páginas centrais */}
                    {core.map((p) => (
                        <PageBtn key={p} p={p} />
                    ))}

                    {/* ellipsis direita + última */}
                    {showRightDots && (
                        <PaginationItem className="mx-1">
                            <span className="px-2 text-muted-foreground select-none">…</span>
                        </PaginationItem>
                    )}
                    {totalPages > 1 && !core.includes(totalPages) && (
                        <PageBtn p={totalPages} />
                    )}

                    {/* Próximo */}
                    <PaginationItem className="mx-4">
                        <PaginationLink
                            href="#"
                            aria-disabled={page === totalPages}
                            className={cn(
                                "h-10 w-auto px-4 rounded-lg text-sm font-medium flex items-center gap-2 no-underline",
                                "transition-all hover:bg-[var(--color-primary-light-70)] hover: active:scale-[.90] hover:text-[var(--color-primary-600)]",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-70)] focus-visible:ring-offset-2",
                                page === totalPages
                                    ? "opacity-50 pointer-events-none"
                                    : "text-[var(--color-primary-600)]"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                go(page + 1);
                            }}
                        >
                            Próximo
                            <ChevronRight className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
