import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ImageRequireSource,
} from "react-native";
import { Link } from "expo-router";

type ItemData = { id: string; name: string; image: ImageRequireSource };

const workout: ItemData[] = [
  {
    id: "workout1",
    name: "Running",
    image: require("@/assets/images/workout/workout2.jpg"),
  },
  {
    id: "workout2",
    name: "Hiking",
    image: require("@/assets/images/workout/workout3.jpg"),
  },
  {
    id: "workout3",
    name: "Weight Training",
    image: require("@/assets/images/workout/workout1.jpg"),
  },
  {
    id: "history",
    name: "Workout History",
    image: require("@/assets/images/workout/workout1.jpg"),
  },
];

type WorkoutActivityProps = {
  item: ItemData;
};

const WorkoutActivity = ({ item }: WorkoutActivityProps) => {
  // If the item is "History", we use the Link component to navigate to the history screen
  if (item.id === "history") {
    return (
      <Link
      href={{ pathname: "/Home/History", params: { workoutName: item.name } }}
      asChild
      >
        <TouchableOpacity
          activeOpacity={0.6}
          className="rounded-lg bg-w1 dark:bg-bl2 aspect-square w-36 mr-3 flex justify-center items-center"
        >
          <ImageBackground
            source={item.image} // Replace with the path to your image
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            imageStyle={{
              borderRadius: 8, // Set borderRadius for ImageBackground
              opacity: 0.8,
            }}
            resizeMode="cover" // or "contain" depending on your preference
          >
            <Text className="text-w1 dark:text-gr text-shadow-[0_2px_15px_#0d0d0f] font-chivo text-lg text-center">
              {item.name}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </Link>
    );
  } else {
    return (
      <Link
        href={{ pathname: "/session", params: { workoutName: item.name } }}
        asChild
      >
        <TouchableOpacity
          activeOpacity={0.6}
          className="rounded-lg bg-w1 dark:bg-bl2 aspect-square w-36 mr-3 flex justify-center items-center"
        >
          <ImageBackground
            source={item.image} // Replace with the path to your image
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            imageStyle={{
              borderRadius: 8, // Set borderRadius for ImageBackground
              opacity: 0.8,
            }}
            resizeMode="cover" // or "contain" depending on your preference
          >
            <Text className="text-w1 dark:text-gr text-shadow-[0_2px_15px_#0d0d0f] font-chivo text-lg text-center">
              {item.name}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </Link>
    );
  };
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
  )
}
