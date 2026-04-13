import { GasPanelMetrics } from "@/app/_components/GasDashboard";

type GasPanelInterpretationProps = {
  values: GasPanelMetrics;
};

function describeHdd(devFromNorm: number) {
  if (devFromNorm > 0) {
    return "HDD가 평년보다 높아 난방 수요가 강한 편입니다.";
  }

  if (devFromNorm < 0) {
    return "HDD가 평년보다 낮아 난방 수요가 약한 편입니다.";
  }

  return "HDD가 평년과 비슷해 난방 수요도 평년 수준에 가깝습니다.";
}

function describeStorageLevel() {
  return "현재 저장량은 가장 최근 발표 기준 재고 수준을 보여주는 참고 정보입니다.";
}

function describeStorageChange(recentStorageChange: number) {
  if (recentStorageChange > 0) {
    return "전주 대비 저장량이 증가해 최근 재고가 늘어난 흐름입니다.";
  }

  if (recentStorageChange < 0) {
    return "전주 대비 저장량이 감소해 최근 재고가 줄어든 흐름입니다.";
  }

  return "전주 대비 저장량 변화가 크지 않아 최근 재고 흐름은 대체로 비슷합니다.";
}

export function GasPanelInterpretation({
  values,
}: GasPanelInterpretationProps) {
  const sentences = [
    describeHdd(values.devFromNorm),
    describeStorageLevel(),
    describeStorageChange(values.recentStorageChange),
  ];

  return (
    <div className="mt-3 rounded-lg border border-black/10 bg-slate-50 px-4 py-3">
      <h3 className="text-sm font-semibold text-black">해석</h3>
      <div className="mt-2 space-y-1.5 text-sm leading-6 text-black/70">
        {sentences.map((sentence) => (
          <p key={sentence}>{sentence}</p>
        ))}
      </div>
    </div>
  );
}
