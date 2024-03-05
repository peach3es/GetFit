import React from "react";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ItemData = { id: string; name: string };
const workout: ItemData[] = [
  { id: "workout1", name: "Running" },
  { id: "workout2", name: "Hiking" },
  { id: "workout3", name: "Weight Training" },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const WorkoutActivity = ({
  item,
  onPress,
  backgroundColor,
  textColor,
}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={{ backgroundColor }} className="">
    <View className="p-2 aspect-square bg-w1 dark:bg-bl2 flex w-36 justify-center items-center rounded-lg m-3">
      <Text className="text-bl dark:text-gr font-chivo text-lg text-center">
        {item.name}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function Workouts() {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? "" : "";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <WorkoutActivity
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
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
