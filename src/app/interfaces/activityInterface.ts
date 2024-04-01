import { SQLError } from "expo-sqlite";

export interface Activity {
  date: string;
  type: string;
  startTime: string;
  endTime: string;
  duration: number;
  heartRateAverage: number | null;
  steps: number;
  caloriesBurned: number | null;
}

// For listing activities where data is an array of Activity objects
export type ListActivitiesCallback = (
  success: boolean,
  data: Activity[] | SQLError
) => void;

// For adding an activity where you would probably return the inserted activity's ID on success
export type AddActivityCallback = (
  success: boolean,
  data: { insertId: number } | SQLError
) => void;
export { SQLError };
