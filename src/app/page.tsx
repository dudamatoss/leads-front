import {LeadCard} from "@/components/Cards/lead-card";
import {StatusFilter} from "@/components/Filters/StatusFilter";
import {Search} from "lucide-react";
import {SearchFilter} from "@/components/Filters/SeaechFilter";
import {OriginFilter, TipesFilter} from "@/components/Filters/DropDownFilter";

export default function Home() {
  return (
      <main className="p-12">
          <div className="flex flex-col ">
              <h1 className= "mb-2 text-4xl font-bold">Leads</h1>
              <h3 className="text-gray-500 text-lg mb-3">Gerencie e vizualize todas as leads</h3>
          </div>
          <div className="flex flex-wrap justify-between">
            <LeadCard /> <LeadCard /> <LeadCard />
              {/*container branco em volta das informaçãoes */}
              <div className="w-full mt-10 mx-auto rounded-xl border shadow-sm bg-white">
                  {/*filtro de status das leads */}
                  <div className="p-6">
                    <StatusFilter />
                  </div>
                  {/*filtro de pesquisa*/}
                  <div className="flex flex-wrap gap-4 p-6">
                      <SearchFilter placeholder="Buscar por nome..." />
                      <OriginFilter />
                      <TipesFilter />
                  </div>

              </div>
          </div>
      </main>
  );
}
