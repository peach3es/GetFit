// DatabaseManager.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('getfitapp.db');

const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Activities (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, type TEXT, startTime TEXT, endTime TEXT, duration INTEGER, heartRateAverage INTEGER, steps INTEGER, caloriesBurned INTEGER);',
      [],
      () => console.log('Table created successfully'),
      (_, err) => console.log('DB Error: ', err)
    );
  });
};

const addActivity = (activity, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Activities (data, type, startTime, endTime, duration, heartRateAverage, steps, caloriesBurned) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
      [activity.date, activity.type, activity.startTime, activity.endTime, activity.duration, activity.heartRateAverage, activity.steps, activity.caloriesBurned],
      (_, result) => callback(true, result),
      (_, err) => callback(false, err)
    );
  });
};

const listActivities = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Activities;',
      [],
      (_, { rows: { _array } }) => callback(true, _array),
      (_, err) => callback(false, err)
    );
  });
};

// Initialize the database when this module is imported
initDB();

export default {
  addActivity,
  listActivities,
  closeDatabase
};
