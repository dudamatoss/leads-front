import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="grid min-h-screen place-items-center bg-gradient-to-b from-background to-muted/40 p-6">
            <div className="flex flex-col items-center gap-6 text-center">
                <SearchX className="h-20 w-20 text-primary" />
                <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
                <p className="max-w-md text-lg text-muted-foreground">
                    A página que você procura não existe ou foi movida.
                </p>
                <Button asChild>
                    <Link href="/">Voltar para início</Link>
                </Button>
            </div>
        </main>
    );
}