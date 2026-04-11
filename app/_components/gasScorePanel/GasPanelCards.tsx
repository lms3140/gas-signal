import { CalculateGasScoreParams } from "@/app/_components/gasScorePanel/libs/gasScore";

type MetricCard = {
  label: string;
  description: string;
  value: number;
};

function formatSignedNumber(value: number, digits = 0) {
  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  return value > 0 ? `+${formatted}` : formatted;
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

type GasPanelCardsProps = {
  values: CalculateGasScoreParams;
};

export function GasPanelCards({ values }: GasPanelCardsProps) {
  const metricCards = buildMetricCards(values);
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {metricCards.map((metric) => (
        <div
          key={metric.label}
          className="rounded-lg border border-black/10 bg-slate-50 p-3"
        >
          <p className="text-sm font-medium text-black">{metric.label}</p>
          <p className="mt-1 text-xs text-black/55">{metric.description}</p>
          <p className="mt-3 text-2xl font-semibold text-black">
            {formatSignedNumber(metric.value, metric.value % 1 === 0 ? 0 : 1)}
          </p>
        </div>
      ))}
    </div>
  );
}
