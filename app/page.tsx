import { EiaChart } from "./_components/EiaChart";
import { GasScorePanel } from "./_components/GasScorePanel";
import { WeeklyHddStatsCard } from "./_components/WeeklyHddStatsCard";
import { GasDashboardResponse } from "./api/gasType";

export default async function Home() {
  const get = await fetch("https://gas.prupruapiapp.store/api/gas?weeks=58");
  const data = (await get.json()) as GasDashboardResponse;

  if (!get.ok) {
    throw new Error(
      `Failed to fetch gas data: ${get.status} ${get.statusText}`,
    );
  }

  const hddData = data.data.heating;

  return (
    <main className="mx-auto flex flex-col gap-2 min-h-screen max-w-5xl min-w-2xl p-6">
      <EiaChart data={data.data.storage} />
      <WeeklyHddStatsCard data={hddData} />
      <GasScorePanel data={data.data} />
    </main>
  );
}
