import { SQLError } from "expo-sqlite";

export interface DailyData {
  date: string;
  heartRateAverage: number | null;
  steps: number;
  caloriesBurned: number | null;
}

// For listing daily data where data is an array of DailyData objects
export type ListDailyDataCallback = (
  success: boolean,
  data: DailyData[] | SQLError
) => void;

export type AddDailyDataCallback = (
  success: boolean,
  data: { insertId: number } | SQLError
) => void;
export { SQLError };
