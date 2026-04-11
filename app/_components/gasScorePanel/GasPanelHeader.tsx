import { GasDashboardResponse } from "@/app/api/gasType";
import {
  calculateGasScore,
  CalculateGasScoreParams,
} from "@/app/_components/gasScorePanel/libs/gasScore";

function getLabelText(label: ReturnType<typeof calculateGasScore>["label"]) {
  switch (label) {
    case "STRONG_BULLISH":
      return "BOIL 강세";
    case "BULLISH":
      return "BOIL 우위";
    case "BEARISH":
      return "KOLD 우위";
    case "STRONG_BEARISH":
      return "KOLD 강세";
    case "NEUTRAL":
    default:
      return "BOIL/KOLD 중립";
  }
}

function getLabelTone(label: ReturnType<typeof calculateGasScore>["label"]) {
  switch (label) {
    case "STRONG_BULLISH":
      return "bg-red-100 text-red-700";
    case "BULLISH":
      return "bg-orange-100 text-orange-700";
    case "BEARISH":
      return "bg-sky-100 text-sky-700";
    case "STRONG_BEARISH":
      return "bg-blue-100 text-blue-700";
    case "NEUTRAL":
    default:
      return "bg-slate-100 text-slate-700";
  }
}

type GasPanelHeaderProps = {
  values: CalculateGasScoreParams;
  data: GasDashboardResponse["data"];
};

export function GasPanelHeader({ values, data }: GasPanelHeaderProps) {
  const result = calculateGasScore(values);
  const latestPeriod = data.storage.at(-1)?.period ?? data.heating.period;

  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-black">가스 점수 요약</h2>
        <p className="text-sm text-black/60">
          난방 수요와 저장량 데이터를 함께 반영한 BOIL/KOLD 판단입니다.
        </p>
      </div>

      <div className="text-right">
        <div
          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getLabelTone(result.label)}`}
        >
          {getLabelText(result.label)}
        </div>
        <p className="mt-2 text-xs text-black/45">
          기준 주간: {latestPeriod} | 지역: {data.storageDuoArea}
        </p>
      </div>
    </div>
  );
}
