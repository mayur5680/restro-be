export interface GygQueryOptions {
  take?: number;
  skip?: number;
  filters?: Record<string, string>;
  sortBy: string;
  tag?: string;
  store?: string;
}
