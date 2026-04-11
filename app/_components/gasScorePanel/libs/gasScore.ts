export type GasScoreLabel =
  | "STRONG_BULLISH"
  | "BULLISH"
  | "NEUTRAL"
  | "BEARISH"
  | "STRONG_BEARISH";

export type GasScoreItemKey =
  | "hddNorm"
  | "hddLastYear"
  | "storageVsAvg"
  | "storageTrend";

export interface GasScoreItem {
  key: GasScoreItemKey;
  label: string;
  score: number;
  description: string;
}

export interface CalculateGasScoreParams {
  // HDD
  devFromNorm: number; // 평년 대비 HDD 차이
  devFromLastYear: number; // 전년 대비 HDD 차이

  // Storage
  currentStorage: number; // 현재 저장량
  seasonalAverageStorage: number; // 같은 시즌 평균 저장량
  recentStorageChange: number; // 최근 n주 저장량 변화량
}

export interface GasScoreResult {
  totalScore: number;
  label: GasScoreLabel;
  summary: string;
  items: GasScoreItem[];
}

function scoreHddNorm(devFromNorm: number): GasScoreItem {
  if (devFromNorm <= -25) {
    return {
      key: "hddNorm",
      label: "HDD 평년 대비",
      score: -2,
      description: `평년보다 ${Math.abs(devFromNorm)}만큼 덜 추워 난방 수요가 약합니다.`,
    };
  }

  if (devFromNorm <= -10) {
    return {
      key: "hddNorm",
      label: "HDD 평년 대비",
      score: -1,
      description: `평년보다 ${Math.abs(devFromNorm)}만큼 덜 추워 수요가 다소 약합니다.`,
    };
  }

  if (devFromNorm >= 25) {
    return {
      key: "hddNorm",
      label: "HDD 평년 대비",
      score: 2,
      description: `평년보다 ${devFromNorm}만큼 더 추워 난방 수요가 강합니다.`,
    };
  }

  if (devFromNorm >= 10) {
    return {
      key: "hddNorm",
      label: "HDD 평년 대비",
      score: 1,
      description: `평년보다 ${devFromNorm}만큼 더 추워 수요가 다소 강합니다.`,
    };
  }

  return {
    key: "hddNorm",
    label: "HDD 평년 대비",
    score: 0,
    description: "평년과 비슷한 수준입니다.",
  };
}

function scoreHddLastYear(devFromLastYear: number): GasScoreItem {
  if (devFromLastYear <= -25) {
    return {
      key: "hddLastYear",
      label: "HDD 전년 대비",
      score: -1,
      description: `작년보다 ${Math.abs(devFromLastYear)}만큼 덜 추워 수요가 약한 편입니다.`,
    };
  }

  if (devFromLastYear <= -10) {
    return {
      key: "hddLastYear",
      label: "HDD 전년 대비",
      score: -0.5,
      description: `작년보다 ${Math.abs(devFromLastYear)}만큼 덜 추워 다소 약합니다.`,
    };
  }

  if (devFromLastYear >= 25) {
    return {
      key: "hddLastYear",
      label: "HDD 전년 대비",
      score: 1,
      description: `작년보다 ${devFromLastYear}만큼 더 추워 수요가 강한 편입니다.`,
    };
  }

  if (devFromLastYear >= 10) {
    return {
      key: "hddLastYear",
      label: "HDD 전년 대비",
      score: 0.5,
      description: `작년보다 ${devFromLastYear}만큼 더 추워 다소 강합니다.`,
    };
  }

  return {
    key: "hddLastYear",
    label: "HDD 전년 대비",
    score: 0,
    description: "작년과 비슷한 수준입니다.",
  };
}

function scoreStorageVsAvg(
  currentStorage: number,
  seasonalAverageStorage: number,
): GasScoreItem {
  const diff = Math.round(currentStorage - seasonalAverageStorage);

  if (diff >= 200) {
    return {
      key: "storageVsAvg",
      label: "저장량 vs 시즌 평균",
      score: -2,
      description: `시즌 평균보다 ${diff} 높아 재고 부담이 큽니다.`,
    };
  }

  if (diff >= 75) {
    return {
      key: "storageVsAvg",
      label: "저장량 vs 시즌 평균",
      score: -1,
      description: `시즌 평균보다 ${diff} 높아 재고가 다소 많은 편입니다.`,
    };
  }

  if (diff <= -200) {
    return {
      key: "storageVsAvg",
      label: "저장량 vs 시즌 평균",
      score: 2,
      description: `시즌 평균보다 ${Math.abs(diff)} 낮아 재고가 부족한 편입니다.`,
    };
  }

  if (diff <= -75) {
    return {
      key: "storageVsAvg",
      label: "저장량 vs 시즌 평균",
      score: 1,
      description: `시즌 평균보다 ${Math.abs(diff)} 낮아 재고가 다소 타이트합니다.`,
    };
  }

  return {
    key: "storageVsAvg",
    label: "저장량 vs 시즌 평균",
    score: 0,
    description: "시즌 평균과 비슷한 수준입니다.",
  };
}

function scoreStorageTrend(recentStorageChange: number): GasScoreItem {
  // 최근 n주 누적 변화량 기준
  // +면 저장량 증가, -면 저장량 감소
  if (recentStorageChange >= 150) {
    return {
      key: "storageTrend",
      label: "최근 저장량 추세",
      score: -1,
      description: `최근 저장량이 ${recentStorageChange} 증가해 공급 부담이 있습니다.`,
    };
  }

  if (recentStorageChange >= 50) {
    return {
      key: "storageTrend",
      label: "최근 저장량 추세",
      score: -0.5,
      description: `최근 저장량이 ${recentStorageChange} 증가해 약한 약세 요인입니다.`,
    };
  }

  if (recentStorageChange <= -150) {
    return {
      key: "storageTrend",
      label: "최근 저장량 추세",
      score: 1,
      description: `최근 저장량이 ${Math.abs(recentStorageChange)} 감소해 수급이 타이트합니다.`,
    };
  }

  if (recentStorageChange <= -50) {
    return {
      key: "storageTrend",
      label: "최근 저장량 추세",
      score: 0.5,
      description: `최근 저장량이 ${Math.abs(recentStorageChange)} 감소해 약한 강세 요인입니다.`,
    };
  }

  return {
    key: "storageTrend",
    label: "최근 저장량 추세",
    score: 0,
    description: "최근 저장량 변화가 크지 않습니다.",
  };
}

function getGasScoreLabel(totalScore: number): GasScoreLabel {
  if (totalScore >= 3) return "STRONG_BULLISH";
  if (totalScore >= 1) return "BULLISH";
  if (totalScore <= -3) return "STRONG_BEARISH";
  if (totalScore <= -1) return "BEARISH";
  return "NEUTRAL";
}

function getGasScoreSummary(label: GasScoreLabel): string {
  switch (label) {
    case "STRONG_BULLISH":
      return "강한 강세 우위";
    case "BULLISH":
      return "강세 우위";
    case "BEARISH":
      return "약세 우위";
    case "STRONG_BEARISH":
      return "강한 약세 우위";
    case "NEUTRAL":
    default:
      return "중립";
  }
}

export function calculateGasScore(
  params: CalculateGasScoreParams,
): GasScoreResult {
  const items: GasScoreItem[] = [
    scoreHddNorm(params.devFromNorm),
    scoreHddLastYear(params.devFromLastYear),
    scoreStorageVsAvg(params.currentStorage, params.seasonalAverageStorage),
    scoreStorageTrend(params.recentStorageChange),
  ];

  const totalScore = Number(
    items.reduce((sum, item) => sum + item.score, 0).toFixed(1),
  );

  const label = getGasScoreLabel(totalScore);
  const summary = getGasScoreSummary(label);

  return {
    totalScore,
    label,
    summary,
    items,
  };
}
