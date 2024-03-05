import React from "react";
import { View, Text } from "react-native";

export default function Daily() {
  return (
    <View>
      <Text className="font-chivo text-3xl font-bold tracking-tight text-bl dark:text-gr">
        Daily Insight
      </Text>
      <View className="rounded-xl bg-w1 dark:bg-bl2 flex flex-row justify-evenly py-7 mt-5 h-fit">
        <View className="flex flex-col gap-6 ">
          <View className="p-5 bg-bl2 dark:bg-gr rounded-md w-36 h-14"></View>
          <View className="p-5 bg-bl2 dark:bg-gr  rounded-md h-14"></View>
        </View>
        <View className="flex flex-col gap-6">
          <View className="p-5 bg-bl2 dark:bg-gr  rounded-md w-36 h-14"></View>
          <View className="p-5 bg-bl2 dark:bg-gr  rounded-md h-14"></View>
        </View>
      </View>
    </View>
  );
}
