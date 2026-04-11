import { GasDashboardResponse } from "../api/gasType";
import { CalculateGasScoreParams } from "./gasScorePanel/libs/gasScore";
import { GasPanelCards } from "./gasScorePanel/GasPanelCards";
import { GasPanelComposite } from "./gasScorePanel/GasPanelComposite";
import { GasPanelHeader } from "./gasScorePanel/GasPanelHeader";

type GasScorePanelProps = {
  data: GasDashboardResponse["data"];
};

function toTimestamp(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function deriveGasScoreParams(
  data: GasDashboardResponse["data"],
): CalculateGasScoreParams {
  const sortedStorage = [...data.storage].sort(
    (a, b) => toTimestamp(a.period) - toTimestamp(b.period),
  );

  const latestItem = sortedStorage.at(-1);
  const currentStorage = latestItem?.value ?? 0;
  const previousStorage = sortedStorage.at(-2)?.value ?? currentStorage;
  const recentStorageChange = currentStorage - previousStorage;
  const totalStorage = sortedStorage.reduce((sum, item) => sum + item.value, 0);
  const averageStorage = totalStorage / (sortedStorage.length || 1);

  return {
    devFromNorm: data.heating.devFromNorm,
    devFromLastYear: data.heating.devFromLastYear,
    currentStorage,
    seasonalAverageStorage: Number(averageStorage.toFixed(1)),
    recentStorageChange: Number(recentStorageChange.toFixed(1)),
  };
}

export function GasScorePanel({ data }: GasScorePanelProps) {
  const values = deriveGasScoreParams(data);

  return (
    <section className="w-full rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <GasPanelHeader data={data} values={values} />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <GasPanelCards values={values} />
        <GasPanelComposite data={data} values={values} />
      </div>
    </section>
  );
}
