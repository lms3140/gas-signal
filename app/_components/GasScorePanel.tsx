import { GasDashboardResponse } from "../api/gasType";
import { CalculateGasScoreParams, calculateGasScore } from "../util/gasCalc";

type GasScorePanelProps = {
  data: GasDashboardResponse["data"];
};

type MetricCard = {
  label: string;
  description: string;
  value: number;
};

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

function getScoreTone(score: number) {
  if (score > 0) {
    return "text-red-600";
  }

  if (score < 0) {
    return "text-blue-600";
  }

  return "text-black";
}

function formatSignedNumber(value: number, digits = 0) {
  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  return value > 0 ? `+${formatted}` : formatted;
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

function toTimestamp(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function deriveGasScoreParams(
  data: GasDashboardResponse["data"],
): CalculateGasScoreParams {
  const storageSeries = [...data.storage].sort(
    (a, b) => toTimestamp(a.createdAt) - toTimestamp(b.createdAt),
  );

  const latestStorage = storageSeries.at(-1)?.value ?? 0;
  const comparisonIndex = Math.max(storageSeries.length - data.storageWeeks, 0);
  const previousStorage =
    storageSeries[comparisonIndex]?.value ?? latestStorage;
  const seasonalAverageStorage =
    storageSeries.reduce((sum, item) => sum + item.value, 0) /
    (storageSeries.length || 1);

  return {
    devFromNorm: data.heating.devFromNorm,
    devFromLastYear: data.heating.devFromLastYear,
    currentStorage: latestStorage,
    seasonalAverageStorage: Number(seasonalAverageStorage.toFixed(1)),
    recentStorageChange: Number((latestStorage - previousStorage).toFixed(1)),
  };
}

function buildMetricCards(values: CalculateGasScoreParams): MetricCard[] {
  return [
    {
      label: "평년 대비 HDD 차이",
      description: "양수면 평년보다 더 추워 수요가 강한 상태입니다.",
      value: values.devFromNorm,
    },
    {
      label: "전년 대비 HDD 차이",
      description: "양수면 전년보다 더 추워진 흐름입니다.",
      value: values.devFromLastYear,
    },
    {
      label: "현재 저장량",
      description: "가장 최근 발표된 천연가스 재고입니다.",
      value: values.currentStorage,
    },
    {
      label: "시즌 평균 저장량",
      description: "현재 데이터 구간의 평균 저장량입니다.",
      value: values.seasonalAverageStorage,
    },
    {
      label: "최근 저장량 변화",
      description: "설정된 비교 주수 기준 저장량 증감입니다.",
      value: values.recentStorageChange,
    },
  ];
}

export function GasScorePanel({ data }: GasScorePanelProps) {
  const values = deriveGasScoreParams(data);
  const result = calculateGasScore(values);
  const metricCards = buildMetricCards(values);
  const latestPeriod = data.storage.at(-1)?.period ?? data.heating.period;
  const storageUnit = data.storage.at(-1)?.units ?? "";

  return (
    <section className="w-full rounded-xl border border-black/10 bg-white p-4 shadow-sm">
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

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {metricCards.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-black/10 bg-slate-50 p-3"
            >
              <p className="text-sm font-medium text-black">{metric.label}</p>
              <p className="mt-1 text-xs text-black/55">{metric.description}</p>
              <p className="mt-3 text-2xl font-semibold text-black">
                {formatSignedNumber(
                  metric.value,
                  metric.value % 1 === 0 ? 0 : 1,
                )}
              </p>
            </div>
          ))}
        </div>

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
      </div>
    </section>
  );
}
