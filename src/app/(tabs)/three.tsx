import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ImageRequireSource,
} from "react-native";
import { Link } from "expo-router";

type ItemData = { id: string; name: string };

const profile: ItemData[] = [
  {
    id: "age",
    name: "Age",
  },
  {
    id: "sex",
    name: "Sex",
  },
  {
    id: "weight",
    name: "Weight",
  },
  {
    id: "height",
    name: "Height",
  },
  {
    id: "history",
    name: "Workout History",
  },
];

type ProfilePageProps = {
  item: ItemData;
  style: string;
};

const ProfileOptions = ({ item, style }: ProfilePageProps) => {
  return (
    <Link
      href={{ pathname: "/Home/History", params: { profileName: item.name } }}
      asChild
    >
      <TouchableOpacity
        activeOpacity={0.6}
        className={`bg-red dark:bg-gr py-5 flex justify-center items-center ${style} border-b-2 border-w2 dark:border-b-bl dark:border-b-2 `}
      >
        <Text className="text-w1 dark:text-bl font-chivo text-lg text-center">
          {item.name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default function TabTwoScreen() {
  const renderItem = ({ item, index }: { item: ItemData; index: number }) => {
    const isFirstItem = index === 0;

    return (
      <ProfileOptions
        item={item}
        style={isFirstItem ? "rounded-t-xl" : ""} // Apply rounded-t-xl style only to the first item
      />
    );
  };
  return (
    <View className="flex items-center pt-24 h-full bg-w2 dark:bg-bl justify-between">
      <View className="flex h-1/4 items-center mb-24">
        <View className="rounded-full aspect-square w-40 bg-w1 mb-10"></View>
        <Text className="text-3xl font-bold text-bl dark:text-w2">
          Profile Page
        </Text>
      </View>
      <View className="w-full rounded-t-xl bg-w1 dark:bg-bl2 h-fit">
        <FlatList
          data={profile}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
