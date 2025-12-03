import type { SmokeLog } from "../types/smoke";
import { SortSmokelogsByCount } from "./sort";

export function getTopFiveLogsByCount(logs: SmokeLog[]): SmokeLog[] {
  if (!logs || logs.length === 0) return [];
  return SortSmokelogsByCount(logs, "asc").slice(-5).reverse();
}
