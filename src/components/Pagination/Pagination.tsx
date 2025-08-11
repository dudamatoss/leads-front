"use client";

import * as React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    scrollTopOnChange?: boolean;    // padrão: true
};

function getPagesToShow(total: number, current: number) {
    // Desenha: 1 … current-1 current current+1 … total
    const set = new Set<number>([1, total, current]);
    if (current > 1) set.add(current - 1);
    if (current < total) set.add(current + 1);
    return Array.from(set)
        .filter((p) => p >= 1 && p <= total)
        .sort((a, b) => a - b);
}

export function PaginationControls({
                                       page,
                                       totalPages,
                                       onPageChange,
                                       className,
                                       scrollTopOnChange = true,
                                   }: Props) {
    const pages = getPagesToShow(totalPages, page);

    const go = (p: number) => {
        if (p < 1 || p > totalPages || p === page) return;
        onPageChange(p);
        if (scrollTopOnChange) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className={cn("flex items-center justify-between w-full", className)}>
      <span className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            aria-disabled={page === 1}
                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                            onClick={(e) => {
                                e.preventDefault();
                                go(page - 1);
                            }}
                        />
                    </PaginationItem>

                    {pages.map((p, i, arr) => {
                        const prev = arr[i - 1];
                        const showEllipsis = i > 0 && p - (prev ?? 0) > 1;
                        return (
                            <React.Fragment key={p}>
                                {showEllipsis && (
                                    <PaginationItem>
                                        <span className="px-2 select-none">…</span>
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        isActive={p === page}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            go(p);
                                        }}
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            </React.Fragment>
                        );
                    })}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            aria-disabled={page === totalPages}
                            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                            onClick={(e) => {
                                e.preventDefault();
                                go(page + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
