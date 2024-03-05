import React from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Workouts() {
  const workout = [
    { id: "workout1", name: "Running" },
    { id: "workout2", name: "Hiking" },
    { id: "workout3", name: "Weight Training" },
  ];
  type ItemProps = { name: string };

  const WorkoutActivity = ({ name }: ItemProps) => (
    <View className="p-2 aspect-square bg-w1 dark:bg-bl2 flex w-36 justify-center items-center rounded-lg m-3">
      <Text className="text-bl dark:text-gr font-chivo text-lg text-center">
        {name}
      </Text>
    </View>
  );
  return (
    <View className="w-full">
      <Text className="font-chivo text-3xl font-bold tracking-tight mt-5 text-bl dark:text-gr">
        What's up for Today?
      </Text>
      <SafeAreaView className="mt-5 flex ">
        <FlatList
          data={workout}
          renderItem={({ item }) => <WorkoutActivity name={item.name} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}
