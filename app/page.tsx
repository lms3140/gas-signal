import { EiaChart } from "./_components/EiaChart";
import { GasDashboard } from "./_components/GasDashboard";
import { WeeklyHddStatsCard } from "./_components/WeeklyHddStatsCard";
import { GasDashboardResponse } from "./api/gasType";

const getGasData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gas?weeks=58`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("failed to fetch", res.status, res.statusText);
      return null;
    }
    const data = (await res.json()) as GasDashboardResponse;
    if (data.ok) {
      return data.data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function Home() {
  const data = await getGasData();

  if (!data) {
    return (
      <main className="mx-auto flex flex-col gap-2 min-h-screen max-w-5xl min-w-2xl p-6">
        <div>실패</div>
      </main>
    );
  }

  const hddData = data.heating;
  return (
    <main className="mx-auto flex flex-col gap-2 min-h-fit max-w-5xl min-w-xs p-6 mb-2">
      <EiaChart data={data.storage} />
      <WeeklyHddStatsCard data={hddData} />
      <GasDashboard data={data} />
    </main>
  );
}
