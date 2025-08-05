import {LeadCard} from "@/components/Cards/lead-card";
import {StatusFilter} from "@/components/Filters/StatusFilter";
import {Search} from "lucide-react";
import {SearchFilter} from "@/components/Filters/SeaechFilter";
import {OriginFilter, TipesFilter} from "@/components/Filters/DropDownFilter";
import {LeadsHeader} from "@/components/Information/LeadsHeader";

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
                  {/*titulo e subtitulo de leads totais */}
                  <div className="pl-6 pt-6 pb-6">
                      <h2 className=" pb-1 text-2xl font-bold">10 Leads</h2>
                      <h3 className=" text-gray-500 text-l">Todas as leads registradas</h3>
                  </div>
                  <div className="p-6">
                      <LeadsHeader />
                  </div>

              </div>
          </div>
      </main>
  );
}
