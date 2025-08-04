import {LeadCard} from "@/components/Cards/lead-card";

export default function Home() {
  return (
      <main >
          <div className="flex flex-col p-6">
              <h1 className= "mb-2 text-4xl font-bold">Leads</h1>
              <h3 className="text-gray-500 text-lg">Gerencie e vizualize todas as leads</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4 px-6">
            <LeadCard /> <LeadCard /> <LeadCard />
          </div>
      </main>
  );
}
