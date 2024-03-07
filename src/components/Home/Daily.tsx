import React from "react";
import { View, Text } from "react-native";

export default function Daily() {
  return (
    <View className="mb-4">
      <Text className="font-chivo text-3xl font-bold tracking-tight text-bl dark:text-gr">
        Daily Insight
      </Text>
      <View className=" rounded-3xl bg-w1 dark:bg-bl2 flex flex-row justify-evenly py-4 mt-5 h-fit ">
        <View className="flex flex-col gap-y-4">
          <View className="bg-bl2 dark:bg-gr rounded-2xl w-40 h-20 ">
            <View className=" px-4 w-full h-full flex flex-row justify-start items-center gap-x-3">
              <View className="bg-w1 aspect-square w-12 rounded-full "></View>
              <Text className="w-fit">Calories </Text>
            </View>
          </View>
          <View className="bg-bl2 dark:bg-gr rounded-2xl w-40 h-20">
            <View className="px-4 w-full h-full flex flex-row justify-start items-center gap-x-3">
              <View className="bg-w1 aspect-square w-12 rounded-full"></View>
              <Text className="w-fit">Water </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col gap-y-4">
          <View className=" bg-bl2 dark:bg-gr rounded-2xl w-40 h-20">
            <View className="px-4 w-full h-full flex flex-row justify-start items-center gap-x-3">
              <View className="bg-w1 aspect-square w-12 rounded-full "></View>
              <Text className="w-fit">Workout </Text>
            </View>
          </View>
          <View className=" bg-bl2 dark:bg-gr rounded-2xl w-40 h-20">
            <View className="px-4 w-full h-full flex flex-row justify-start items-center gap-x-3">
              <View className="bg-w1 aspect-square w-12 rounded-full "></View>
              <Text className="w-fit">Streak </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
