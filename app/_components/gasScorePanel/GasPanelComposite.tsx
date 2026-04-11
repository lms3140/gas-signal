import { GasDashboardResponse } from "@/app/api/gasType";
import {
  calculateGasScore,
  CalculateGasScoreParams,
} from "@/app/_components/gasScorePanel/libs/gasScore";

function getScoreTone(score: number) {
  if (score > 0) {
    return "text-red-600";
  }

  if (score < 0) {
    return "text-blue-600";
  }

  return "text-black";
}

function getScoreMeaning(score: number) {
  if (score > 0) {
    return "BOIL 유리";
  }

  if (score < 0) {
    return "KOLD 유리";
  }

  return "중립";
}

type GasPanelCompositeProps = {
  values: CalculateGasScoreParams;
  data: GasDashboardResponse["data"];
};
export function GasPanelComposite({ values, data }: GasPanelCompositeProps) {
  const result = calculateGasScore(values);
  const storageUnit = data.storage.at(-1)?.units ?? "";
  return (
    <>
      <div className="rounded-lg border border-black/10 bg-slate-50 p-4">
        <p className="text-sm text-black/60">BOIL/KOLD 종합 점수</p>
        <p
          className={`mt-1 text-4xl font-semibold ${getScoreTone(result.totalScore)}`}
        >
          {result.totalScore}
        </p>
        <p className="mt-2 text-sm font-medium text-black/80">
          {getScoreMeaning(result.totalScore)}
        </p>
        <p className="mt-1 text-sm text-black/60">{result.summary}</p>

        <div className="mt-4 space-y-3">
          {result.items.map((item) => (
            <div
              key={item.key}
              className="rounded-lg border border-white bg-white p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-black">{item.label}</p>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${getScoreTone(item.score)}`}
                  >
                    {item.score > 0 ? `+${item.score}` : item.score}
                  </p>
                  <p className="text-xs text-black/50">
                    {getScoreMeaning(item.score)}
                  </p>
                </div>
              </div>
              <p className="mt-1 text-sm text-black/60">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-3">
          <p className="text-xs font-semibold tracking-wide text-amber-800">
            참고
          </p>
          <p className="mt-1 text-sm leading-6 text-amber-950">
            저장량은 최근 {data.storageWeeks}주 비교와 평균값을 사용했습니다.
            {storageUnit ? ` 저장 단위는 ${storageUnit}입니다.` : ""}
          </p>
        </div>
      </div>
    </>
  );
}
