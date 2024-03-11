import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Activity, ListActivitiesCallback, AddActivityCallback, SQLError } from '../types/activityTypes';
import DatabaseManager from '../services/DatabaseManager';

const History = () => {
  const [history, setHistory] = useState<Activity[]>([]);

  useEffect(() => {
    const callback: ListActivitiesCallback = (success, data) => {
      if (success) {
          setHistory(data as Activity[]); // Cast data to Activity[] since we know it is a success
      } else {
        console.error("Error fetching activity history", data); // Log the error, data is SQLError
      }
    };

    DatabaseManager.listActivities(callback);
  }, []);

  return (
    <View className="w-full">
      <Text className="font-chivo text-3xl font-bold tracking-tight mt-5 text-bl dark:text-gr">
        History
      </Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Date: {item.date}</Text>
            <Text>Type: {item.type}</Text>
            <Text>StartTime: {item.startTime}</Text>
            <Text>EndTime: {item.endTime}</Text>
            <Text>Duration: {item.duration} seconds</Text>
            {/* Display additional data as needed */}
          </View>
        )}
        nestedScrollEnabled={true} // Enable nested scrolling for Android
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default History;