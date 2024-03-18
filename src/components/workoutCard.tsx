import React from "react";
import { View, Text } from "react-native";
import { Iconify } from "react-native-iconify";
import { useColorScheme } from "react-native";

export default function WorkoutCard({
  date,
  type,
  startTime,
  endTime,
  duration,
}: {
  date: string;
  type: string;
  startTime: any;
  endTime: any;
  duration: number;
}) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#93cd64" : "#b33534";
  return (
    <View className="rounded-xl bg-w1 dark:bg-bl2 mb-2 flex flex-row p-5 justify-between">
      <View className="flex flex-row">
        <View className="rounded-full w-16 aspect-square bg-w2 dark:bg-bl mr-5 items-center justify-center">
          {type === "Running" && (
            <Iconify
              icon="ph:person-simple-run-fill"
              size={48}
              color={iconColor}
            />
          )}
          {type === "Hiking" && (
            <Iconify icon="ph:mountains-fill" size={48} color={iconColor} />
          )}
          {type === "Weight Training" && (
            <Iconify icon="ph:barbell-fill" size={48} color={iconColor} />
          )}
        </View>
        <View className="flex flex-col">
          <Text className="font-bold text-xl mb-4 text-bl dark:text-w1">
            {type}
          </Text>
          <View className="flex flex-row gap-x-6">
            <View className="flex flex-row justify-center items-center">
              <Iconify icon="ph:fire-fill" size={22} color={iconColor} />
              <Text className="font-bold text-sm ml-2 text-bl dark:text-w1">
                kcal
              </Text>
            </View>
            <View className="flex flex-row justify-center items-center">
              <Iconify icon="ph:timer-fill" size={22} color={iconColor} />
              <Text className="font-bold text-sm ml-2 text-bl dark:text-w1">
                {duration} sec
              </Text>
            </View>
            <View className="flex flex-row justify-center items-center">
              <Iconify icon="ph:heartbeat-fill" size={22} color={iconColor} />
              <Text className="font-bold text-sm ml-2 text-bl dark:text-w1">
                bpm
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-col absolute top-5 right-5">
        <Text className="font-bold text-bl dark:text-w1">{date}</Text>
      </View>
    </View>
  );
}
