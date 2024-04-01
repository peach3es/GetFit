import React from "react";
import { View, Text, useColorScheme, InteractionManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pedometer } from "expo-sensors";
import { useState, useEffect } from "react";
import DatabaseManager from "../services/DatabaseManager";
import { Iconify } from "react-native-iconify";

export default function Daily() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#93cd64" : "#b33534";

  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable) {
      Pedometer.requestPermissionsAsync();
      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    // Load the initial step count from AsyncStorage when the app starts
    const loadStepCount = async () => {
      const storedStepCount = await AsyncStorage.getItem("dailyStepCount");
      setCurrentStepCount(storedStepCount ? parseInt(storedStepCount, 10) : 0);
    };

    loadStepCount();

    const setupSubscription = async () => {
      const sub = await subscribe();

      // Save the steps at 23:59:59 every day
      const endTime = new Date();
      endTime.setHours(23, 59, 59, 999);
      const timeout = endTime.getTime() - Date.now();
      const dailySaveTimeout = setTimeout(saveDailyData, timeout);

      // Cleanup function
      return () => {
        // Check if subscription is defined before accessing remove
        sub && sub.remove();
        clearTimeout(dailySaveTimeout);
      };
    };

    InteractionManager.runAfterInteractions(() => {
      setupSubscription();
    });
  }, []);

  const createDailyData = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    return {
      date: formattedDate,
      heartRateAverage: null,
      steps: currentStepCount,
      caloriesBurned: null,
    };
  };

  const saveDailyData = async () => {
    const dailyData = createDailyData();
    DatabaseManager.addDailyData(dailyData, (success, result) => {
      if (success) {
        console.log("Daily data saved:", result);
      } else {
        console.log("Error saving daily data:", result);
      }
    });
    await AsyncStorage.setItem("dailyStepCount", currentStepCount.toString());
  };

  return (
    <View className="">
      <Text className="font-chivo text-3xl tracking-tight text-bl dark:text-gr">
        Daily Insight
      </Text>
      <View className=" rounded-3xl bg-w1 dark:bg-bl2 flex flex-row justify-evenly py-4 mt-5 h-fit ">
        <View className="flex flex-col gap-y-4">
          <View className="bg-red dark:bg-gr rounded-2xl w-40 h-20 ">
            <View className=" px-4 w-full h-full flex flex-row justify-start items-center gap-x-3">
              <View className="bg-w1 dark:bg-bl aspect-square w-12 rounded-full items-center justify-center pl-[2px] pb-[1px]">
                <Iconify
                  icon="solar:fire-bold-duotone"
                  size={36}
                  color={iconColor}
                />
              </View>
              <Text className="w-fit text-w2 dark:text-bl font-medium">
                Calories{" "}
              </Text>
            </View>
          </View>
          <View className="bg-red dark:bg-gr rounded-2xl w-40 h-20">
            <View className="px-4 w-full h-full flex flex-row justify-start items-center gap-x-3">
              <View className="bg-w1 dark:bg-bl aspect-square w-12 rounded-full items-center justify-center pt-1">
                <Iconify
                  icon="solar:heart-pulse-bold-duotone"
                  size={36}
                  color={iconColor}
                />
              </View>
              <Text className="w-fit text-w2 dark:text-bl font-medium">
                Heartrate
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col gap-y-4">
          <View className=" bg-red dark:bg-gr rounded-2xl w-40 h-20">
            <View className="px-4 w-full h-full flex flex-row justify-start items-center gap-x-3">
              <View className="bg-w1 dark:bg-bl aspect-square w-12 rounded-full items-center justify-center">
                <Iconify
                  icon="solar:dumbbell-small-bold-duotone"
                  size={42}
                  color={iconColor}
                />
              </View>
              <Text className="w-fit text-w2 dark:text-bl">Workout </Text>
            </View>
          </View>
          <View className=" bg-red dark:bg-gr rounded-2xl w-40 h-20">
            <View className="px-4 w-full h-full flex flex-row justify-start items-center gap-x-3">
              <View className="bg-w1 dark:bg-bl aspect-square w-12 rounded-full items-center justify-center">
                <Iconify
                  icon="solar:walking-round-bold-duotone"
                  size={36}
                  color={iconColor}
                />
              </View>
              <Text className="w-fit text-w2 dark:text-bl font-medium">
                Steps: {currentStepCount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
