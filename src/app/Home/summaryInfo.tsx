import React from "react";
import { View, Text } from "react-native";

export default function Summary() {
  return (
    <View className="bg-w2 dark:bg-bl h-full p-8 flex">
      <View className="justify-end bottom-3">
        <Text className="text-5xl font-montreau h-1/4 text-bl dark:text-w1">
          Summary
        </Text>
      </View>
      <View className="flex w-full p-5 rounded-xl bg-w1 dark:bg-bl2 h-3/4"></View>
    </View>
  );
}
