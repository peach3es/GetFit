import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useNavigation } from "expo-router";

type ItemData = { id: string; name: string };

const workout: ItemData[] = [
  { id: "workout1", name: "Running" },
  { id: "workout2", name: "Hiking" },
  { id: "workout3", name: "Weight Training" },
];

type WorkoutActivityProps = {
  item: ItemData;
};

const WorkoutActivity = ({ item }: WorkoutActivityProps) => {
  return (
    <Link
      href={{ pathname: "/session", params: { workoutName: item.name } }}
      asChild
    >
      <TouchableOpacity
        activeOpacity={0.6}
        className="rounded-lg bg-w1 dark:bg-bl2 aspect-square w-36 mr-3 flex justify-center items-center"
      >
        <Text className="text-bl dark:text-gr font-chivo text-lg text-center">
          {item.name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default function Workouts() {
  const renderItem = ({ item }: { item: ItemData }) => {
    return <WorkoutActivity item={item} />;
  };
  return (
    <View className="w-full">
      <Text className="font-chivo text-3xl font-bold tracking-tight mt-5 text-bl dark:text-gr">
        What's up for Today?
      </Text>
      <SafeAreaView className="mt-5 flex ">
        <FlatList
          data={workout}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}
