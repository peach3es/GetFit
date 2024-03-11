import * as SQLite from 'expo-sqlite';
import { Activity, ListActivitiesCallback, AddActivityCallback } from '../types/activityTypes';

const db = SQLite.openDatabase('getfitapp.db');

const initDB = (): void => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Activities (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, type TEXT, startTime TEXT, endTime TEXT, duration INTEGER, heartRateAverage INTEGER, steps INTEGER, caloriesBurned INTEGER);',
      [],
      () => console.log('Table created successfully'),
      (tx, err) => { console.log('DB Error: ', err); return false; } // Updated to match expected error callback
    );
  });
};

const addActivity = (activity: Activity, callback: AddActivityCallback): void => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Activities (date, type, startTime, endTime, duration, heartRateAverage, steps, caloriesBurned) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
      [activity.date, activity.type, activity.startTime, activity.endTime, activity.duration, activity.heartRateAverage, activity.steps, activity.caloriesBurned],
      (tx, resultSet) => {
        // Assuming that resultSet is of the correct type that includes insertId.
        const insertId = resultSet.insertId as number; // Cast insertId as a number.
        callback(true, { insertId });
      },
      (tx, err) => {
        callback(false, err);
        return false;
      }
    );
  });
};


const listActivities = (callback: ListActivitiesCallback): void => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Activities ORDER BY id DESC;',
      [],
      (tx, resultSet) => callback(true, resultSet.rows._array as Activity[]), // Assuming resultSet.rows._array is an array of Activity objects
      (tx, err) => { callback(false, err); return false} // Pass the error object directly
    );
  });
};

// Initialize the database when this module is imported
initDB();

export default {
  addActivity,
  listActivities,
};
