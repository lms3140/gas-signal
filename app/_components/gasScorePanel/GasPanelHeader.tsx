import { GasDashboardResponse } from "@/app/api/gasType";

type GasPanelHeaderProps = {
  data: GasDashboardResponse["data"];
};

export function GasPanelHeader({ data }: GasPanelHeaderProps) {
  const latestPeriod = data.storage.at(-1)?.period ?? data.heating.period;

  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-black">핵심 지표</h2>
        <p className="text-sm text-black/60">
          천연가스 수급을 볼 때 참고할 핵심 지표를 모아둡니다.
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs text-black/45">
          기준 주간: {latestPeriod} | 지역: {data.storageDuoArea}
        </p>
      </div>
    </div>
  );
}
