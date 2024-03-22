import * as SQLite from 'expo-sqlite';
import { Activity, ListActivitiesCallback, AddActivityCallback } from '../types/activityTypes';
import { UserProfileData, ListUserDataCallback, AddUserDataCallback } from '../UserProfileInterface';

const db = SQLite.openDatabase('getfitapp.db');

// New function to initialize user profile table
const initUserProfileDB = (): void => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS UserProfile (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, sex TEXT, dob TEXT, height DOUBLE, weight DOUBLE, heightUnitPref TEXT, weightUnitPref TEXT);',
      [],
      () => console.log('UserProfile table created successfully'),
      (tx, err) => { console.log('DB Error: ', err); return false; }
    );
  });
};

// Functions to set user information
const setUserName = (name: string, callback: AddUserDataCallback): void => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM UserProfile;',
      [],
      (_, selectResult) => {
        if (selectResult.rows.length === 0) {
          // If no profile exists, insert a new one
          tx.executeSql(
            'INSERT INTO UserProfile (name) VALUES (?);',
            [name],
            (_, insertResult) => {
              // Use the insertId if available, otherwise default to 1
              const insertId = insertResult.insertId ?? 1;
              callback(true, { insertId });
            },
            (_, err) => {
              console.error('InsertUserName Error: ', err);
              callback(false, err);
              return false;
            }
          );
        } else {
          // If a profile already exists, update it
          tx.executeSql(
            'UPDATE UserProfile SET name = ? WHERE id = 1;',
            [name],
            (_, updateResult) => {
              // The update does not provide an insertId, so we default to 1
              callback(true, { insertId: 1 });
            },
            (_, err) => {
              console.error('UpdateUserName Error: ', err);
              callback(false, err);
              return false;
            }
          );
        }
      },
      (_, err) => {
        console.error('SelectUserName Error: ', err);
        callback(false, err);
        return false;
      }
    );
  });
};
const setUserSex = (sex: string, callback: AddUserDataCallback): void => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE UserProfile SET sex = ? WHERE id = 1;',
      [sex],
      (_, resultSet) => {
        console.log('UserSex updated successfully');
        callback(true, { insertId: 1 });
      },
      (tx, err) => {
        console.error('SetUserSex Error: ', err);
        callback(false, err);
        return false;
      }
    );
  });
};
const setUserDOB = (dob: string, callback: AddUserDataCallback): void => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE UserProfile SET dob = ? WHERE id = 1;',
      [dob],
      (_, resultSet) => {
        console.log('UserDOB updated successfully');
        callback(true, { insertId: 1 });
      },
      (tx, err) => {
        console.error('SetUserDOB Error: ', err);
        callback(false, err);
        return false;
      }
    );
  });
};
const setUserHeightAndUnitPref = (height: number, heightUnitPref: string, callback: AddUserDataCallback): void => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE UserProfile SET height = ?, heightUnitPref = ? WHERE id = 1;',
      [height, heightUnitPref],
      (_, resultSet) => {
        console.log('UserHeight and heightUnitPref updated successfully');
        callback(true, { insertId: 1 });
      },
      (tx, err) => {
        console.error('SetUserHeightAndUnitPref Error: ', err);
        callback(false, err);
        return false;
      }
    );
  });
};
const setUserWeightAndUnitPref = (weight: number, weightUnitPref: string, callback: AddUserDataCallback): void => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE UserProfile SET weight = ?, weightUnitPref = ? WHERE id = 1;',
      [weight, weightUnitPref],
      (_, resultSet) => {
        console.log('UserWeight and weightUnitPref updated successfully');
        callback(true, { insertId: 1 });
      },
      (tx, err) => {
        console.error('SetUserWeightAndUnitPref Error: ', err);
        callback(false, err);
        return false;
      }
    );
  });
};
const setUserHeight = (height: number, callback: AddUserDataCallback): void => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE UserProfile SET height = ? WHERE id = 1;',
      [height],
      (_, resultSet) => {
        console.log('UserHeight updated successfully');
        callback(true, { insertId: 1 });
      },
      (tx, err) => {
        console.error('SetUserHeight Error: ', err);
        callback(false, err);
        return false;
      }
    );
  });
};
const setUserWeight = (weight: number, callback: AddUserDataCallback): void => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE UserProfile SET weight = ? WHERE id = 1;',
      [weight],
      (_, resultSet) => {
        console.log('UserWeight updated successfully');
        callback(true, { insertId: 1 });
      },
      (tx, err) => {
        console.error('SetUserWeight Error: ', err);
        callback(false, err);
        return false;
      }
    );
  });
};
// Function to get user profile information
const getUserProfile = (callback: ListUserDataCallback): void => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM UserProfile WHERE id = 1;',
      [],
      (_, resultSet) => {
        const profiles = resultSet.rows._array as UserProfileData[];
        callback(true, profiles);
      },
      (tx, err) => {
        callback(false, err);
        return false;
      }
    );
  });
};

const initActivityDB = (): void => {
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
initUserProfileDB();
initActivityDB();

export default {
  addActivity,
  listActivities,
  setUserName,
  setUserSex,
  setUserDOB,
  setUserHeight,
  setUserWeight,
  setUserHeightAndUnitPref,
  setUserWeightAndUnitPref,
  getUserProfile
};
