// Define an interface for the activity object
interface Activity {
    id: number;
    date: string;
    type: string;
    startTime: string;
    endTime: string;
    duration: number;
    heartRateAverage: number | null;
    steps: number | null;
    caloriesBurned: number | null;
  }
  
  // Define a type for the callback function used in listActivities
  type ListActivitiesCallback = (success: boolean, data: Activity[]) => void;
  