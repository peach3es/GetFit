import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Activity, ListActivitiesCallback } from "../types/activityTypes";
import DatabaseManager from "../services/DatabaseManager";
import { useLocalSearchParams } from "expo-router";
import WorkoutCard from "@/src/components/workoutCard";

const History: React.FC = () => {
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
    <View className="bg-w2 dark:bg-bl h-full">
      <View className="flex h-full w-full p-5">
        <Text className="text-bl dark:text-w2 font-montreau text-5xl mt-20 mb-10 text-bold">
          Workout History
        </Text>

        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <WorkoutCard
              date={item.date}
              type={item.type}
              startTime={item.startTime}
              endTime={item.endTime}
              duration={item.duration}
              steps={item.steps || null}
            />
          )}
          // nestedScrollEnabled={true} // Enable nested scrolling for Android
          className="h-full"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 5, // Reduced padding at the top
  },
  title: {
    fontSize: 56, // Adjusted for smaller font size
    fontWeight: "bold",
    marginBottom: 16, // Reduced bottom margin to bring title closer to list
  },
  item: {
    paddingVertical: 10, // Reduced vertical padding for each item
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default History;
