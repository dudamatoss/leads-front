"use client";

export function LeadsLoading(){
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500 mb-4" />
        <p className="text-lg font-medium">Carregando...</p>
    </div>
    );
}