"use client";

export function LeadsLoading(){
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center" style={{color: "var(--color-gray-500)"}}>
            <div className="h-12 w-12 animate-spin rounded-full border-4 mb-4" style={{borderColor: "var(--color-gray-300)", borderTopColor: "var(--color-primary-500)"}} />
        <p className="text-lg font-medium">Carregando...</p>
    </div>
    );
}