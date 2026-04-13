import { GasPanelMetrics } from "@/app/_components/GasDashboard";

type MetricCard = {
  label: string;
  description: string;
  value: string;
};

function formatNumber(value: number) {
  const digits = Number.isInteger(value) ? 0 : 1;

  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatSignedNumber(value: number) {
  const formatted = formatNumber(value);
  return value > 0 ? `+${formatted}` : formatted;
}

function withUnit(value: string, unit: string) {
  return unit ? `${value} ${unit}` : value;
}

function buildMetricCards(values: GasPanelMetrics): MetricCard[] {
  return [
    {
      label: "HDD 평년 대비",
      description: "기준 주간 HDD가 평년과 얼마나 차이 나는지 보여줍니다.",
      value: formatSignedNumber(values.devFromNorm),
    },
    {
      label: "현재 저장량",
      description: "가장 최근 발표된 천연가스 저장량입니다.",
      value: withUnit(formatNumber(values.currentStorage), values.storageUnit),
    },
    {
      label: "전주 대비 저장량 변화",
      description: "직전 주와 비교한 저장량 차이입니다.",
      value: withUnit(
        formatSignedNumber(values.recentStorageChange),
        values.storageUnit,
      ),
    },
  ];
}

type GasPanelCardsProps = {
  values: GasPanelMetrics;
};

export function GasPanelCards({ values }: GasPanelCardsProps) {
  const metricCards = buildMetricCards(values);

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {metricCards.map((metric) => (
        <div
          key={metric.label}
          className="rounded-lg border border-black/10 bg-slate-50 p-3"
        >
          <p className="text-sm font-medium text-black">{metric.label}</p>
          <p className="mt-1 text-xs text-black/55">{metric.description}</p>
          <p className="mt-3 text-2xl font-semibold text-black">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}
