export interface EiaStorageWeeklyRawRow {
  period: string;
  duoarea: string;
  "area-name"?: string;
  value: string | number;
  units?: string;
}

export interface EiaStorageWeeklyRawResponse {
  apiVersion: string;
  request: {
    command: string;
    params: {
      api_key: string;
      data: string[];
      facets: {
        duoarea: string[];
      };
      frequency: string;
      length: string;
      offset: string;
      sort: {
        column: string;
        direction: "asc" | "desc";
      }[];
    };
  };
  response: {
    data: EiaStorageWeeklyRawRow[];
    dateFormat: string;
    frequency: string;
    total: string;
  };
}
