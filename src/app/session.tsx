import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";

const Session = () => {
  const route = useLocalSearchParams();
  const workoutName = route.workoutName || "Workout Name";
  const [isActive, setIsActive] = useState(true);
  const [time, setTime] = useState(0);

  // Create a new Date object and format it
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  useEffect(() => {
    if (workoutName) {
      handleReset();
      setIsActive(true);
    }
  }, [workoutName]);

  return (
    <View className="bg-w2 dark:bg-bl h-full">
      <View className="flex h-4/5 w-full p-5">
        <Text className="text-bl dark:text-w2 font-montreau text-5xl mt-56 text-bold">
          {workoutName}
        </Text>
        <View className="mt-10 flex ">
          <Text className="text-bl dark:text-w2 text-4xl">Timer</Text>
          <Text className="text-bl dark:text-w2 text-lg mt-2 pl-1">
            {formattedDate}
          </Text>
          <Text className="text-bl dark:text-w2 text-7xl mt-5">
            {new Date(time * 1000).toISOString().substr(11, 8)}{" "}
          </Text>
        </View>
        <View className="flex flex-row mt-20 justify-evenly">
          <TouchableOpacity
            onPress={handleStartStop}
            style={isActive ? styles.stopButton : styles.startButton}
            className="rounded-full aspect-square w-20 flex justify-center items-center"
            activeOpacity={0.6}
          >
            <Text style={styles.buttonText}>
              {isActive ? "Pause " : "Start "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReset}
            style={styles.resetButton}
            className="rounded-full aspect-square w-20 flex justify-center items-center"
            activeOpacity={0.6}
          >
            <Text style={styles.buttonText}>Reset </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-1/5 bg-w1 dark:bg-bl2 rounded-t-xl">
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  startButton: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  stopButton: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  resetButton: {
    padding: 10,
    backgroundColor: "darkgrey",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Session;
