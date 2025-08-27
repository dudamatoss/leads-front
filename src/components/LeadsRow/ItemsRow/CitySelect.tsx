"use client";

import { useEffect, useState } from "react";
import { LeadType } from "@/schemas/leads-schemas";
import { usePutLead } from "@/hooks/usePutLeads";
import { useUndo } from "@/components/Undo/Undo";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface City {
    id: number;
    nome: string;
    sigla: string;
}

interface CitySelectProps {
    lead: LeadType;
    onUpdate?: () => void;
}

let cachedCities: City[] | null = null;
let fetchPromise: Promise<City[]> | null = null;

function norm(value: string) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[^a-z0-9\s]/g, "")
        .trim();
}

async function loadCities(): Promise<City[]> {
    if (cachedCities) return cachedCities;
    if (!fetchPromise) {
        fetchPromise = fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome"
        )
            .then((res) => {
                if (!res.ok) throw new Error("Falha ao buscar cidades");
                return res.json() as Promise<{
                    id?: number;
                    nome?: string;
                    microrregiao?: { mesorregiao?: { UF?: { sigla?: string } } };
                }[]>;
            })
            .then((data) => {
                cachedCities = data
                    .map((c) => ({
                        id: Number(c.id ?? 0),
                        nome: (c.nome ?? "").trim(),
                        sigla: c.microrregiao?.mesorregiao?.UF?.sigla ?? "",
                    }))
                    .filter((c) => c.id > 0 && c.nome);
                return cachedCities;
            })
            .catch((err) => {
                console.error("Erro ao carregar cidades:", err);
                cachedCities = [];
                return cachedCities;
            });
    }
    return fetchPromise;
}

export function CitySelect({ lead, onUpdate }: CitySelectProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(lead.cidade ?? "");
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const { updateLead } = usePutLead();
    const showUndo = useUndo();

    useEffect(() => {
        setSelected(lead.cidade ?? "");
    }, [lead.cidade]);

    useEffect(() => {
        if (search.length < 3) {
            setCities([]);
            return;
        }
        setLoading(true);
        const handler = setTimeout(() => {
            loadCities().then((all) => {
                const q = norm(search);
                setCities(
                    all.filter((c) => norm(`${c.nome} ${c.sigla}`).includes(q)).slice(0, 20)
                );
                setLoading(false);
            });
        }, 300);
        return () => clearTimeout(handler);
    }, [search]);

    const handleSelect = async (city: City) => {
        const previous = selected;
        const name = `${city.nome} - ${city.sigla}`;
        setSelected(name);
        setOpen(false);
        try {
            await updateLead({
                id_leads_comercial: lead.id_leads_comercial,
                cidade: city.nome,
            });
            onUpdate?.();
            showUndo(async () => {
                await updateLead({
                    id_leads_comercial: lead.id_leads_comercial,
                    cidade: previous || null,
                    cidade_id: null,
                });
                onUpdate?.();
            });
        } catch (err) {
            console.error("Erro ao atualizar cidade:", err);
            setSelected(previous);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[170px] h-7 justify-between font-normal"
                >
          <span className="truncate max-w-[140px]">
            {selected || "Selecione a cidade"}
          </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Buscar cidade..."
                        value={search}
                        onValueChange={setSearch}
                        className="h-9"
                    />
                    <CommandList>
                        {search.length < 3 ? (
                            <div className="p-2 text-sm text-muted-foreground">
                                Digite pelo menos 3 letras.
                            </div>
                        ) : loading ? (
                            <div className="p-2 flex justify-center">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : cities.length === 0 ? (
                            <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                        ) : (
                            <CommandGroup>
                                {cities.map((city) => {
                                    const label = `${city.nome} - ${city.sigla}`;
                                    return (
                                        <CommandItem
                                            key={city.id}
                                            onSelect={() => handleSelect(city)}
                                        >
                                            {label}
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selected.startsWith(city.nome)
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}