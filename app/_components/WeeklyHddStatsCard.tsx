import { Heating } from "../api/gasType";

type WeeklyHddStatsCardProps = {
  data: Heating;
  symbol?: string;
};

function formatSignedValue(value: number) {
  if (value > 0) {
    return `+${value}`;
  }

  return `${value}`;
}

function getValueTone(value: number) {
  if (value > 0) {
    return "text-red-600";
  }

  if (value < 0) {
    return "text-blue-600";
  }

  return "text-black";
}

function describeDeviation(value: number, baseline: string) {
  if (value > 0) {
    return `${baseline}보다 ${Math.abs(value)}만큼 더 추움`;
  }

  if (value < 0) {
    return `${baseline}보다 ${Math.abs(value)}만큼 더 따뜻함`;
  }

  return `${baseline}와 비슷한 수준`;
}

export function WeeklyHddStatsCard({ data, symbol }: WeeklyHddStatsCardProps) {
  const metrics = [
    {
      label: "이번 주 HDD",
      value: data.weekTotal.toLocaleString(),
      tone: "text-black",
      description: "최근 1주 기준 난방 수요 강도",
    },
    {
      label: "평년 대비",
      value: formatSignedValue(data.devFromNorm),
      tone: getValueTone(data.devFromNorm),
      description: describeDeviation(data.devFromNorm, "평년"),
    },
    {
      label: "전년 대비",
      value: formatSignedValue(data.devFromLastYear),
      tone: getValueTone(data.devFromLastYear),
      description: describeDeviation(data.devFromLastYear, "작년"),
    },
  ];

  return (
    <section className="w-full rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-black">HDD 요약</h2>
          <p className="text-sm text-black/60">
            {symbol ? `${symbol} 참고 지표` : "가스 난방 수요 참고 지표"}
          </p>
        </div>

        <div className="text-right text-xs text-black/50">
          <p>예보 주간 종료: {data.period}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-black/10 bg-slate-50 p-3"
          >
            <p className="text-xs font-medium tracking-wide text-black/50">
              {metric.label}
            </p>
            <p className={`mt-2 text-2xl font-semibold ${metric.tone}`}>
              {metric.value}
            </p>
            <p className="mt-1 text-sm text-black/60">{metric.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
