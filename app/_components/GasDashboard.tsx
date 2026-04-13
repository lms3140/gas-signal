import { GasDashboardResponse } from "../api/gasType";
import { GasPanelCards } from "./gasScorePanel/GasPanelCards";
import { GasPanelHeader } from "./gasScorePanel/GasPanelHeader";
import { GasPanelInterpretation } from "./gasScorePanel/GasPanelInterpretation";

type GasDashboardProps = {
  data: GasDashboardResponse["data"];
};

export type GasPanelMetrics = {
  devFromNorm: number;
  currentStorage: number;
  recentStorageChange: number;
  storageUnit: string;
};

function toTimestamp(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function deriveGasPanelMetrics(
  data: GasDashboardResponse["data"],
): GasPanelMetrics {
  const sortedStorage = [...data.storage].sort(
    (a, b) => toTimestamp(a.period) - toTimestamp(b.period),
  );

  const latestItem = sortedStorage.at(-1);
  const currentStorage = latestItem?.value ?? 0;
  const previousStorage = sortedStorage.at(-2)?.value ?? currentStorage;

  return {
    devFromNorm: data.heating.devFromNorm,
    currentStorage,
    recentStorageChange: Number((currentStorage - previousStorage).toFixed(1)),
    storageUnit: latestItem?.units ?? "",
  };
}

export function GasDashboard({ data }: GasDashboardProps) {
  const values = deriveGasPanelMetrics(data);

  return (
    <section className="w-full rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <GasPanelHeader data={data} />
      <GasPanelCards values={values} />
      <GasPanelInterpretation values={values} />
    </section>
  );
}
