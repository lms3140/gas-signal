export type GasDashboardResponse = {
  ok: boolean;
  data: {
    storageDuoArea: string;
    storageWeeks: number;
    heating: Heating;
    storagePeriods: string[];
    storage: {
      period: string;
      areaName: string;
      value: number;
      units: string;
      createdAt: string;
    }[];
  };
};

export type Heating = {
  period: string;
  weekTotal: number;
  devFromNorm: number;
  devFromLastYear: number;
  seasonalTotal: number;
  seasonalDevFromNorm: number;
  seasonalDevFromLastYear: number;
  seasonalDevFromNormPct: number;
  seasonalDevFromLastYearPct: number;
  createdAt: string;
};
