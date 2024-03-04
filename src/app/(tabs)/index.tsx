import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import "@/global.css";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import { Image } from "react-native";
// import { getColors } from "react-native-image-colors";
import React, { useState, useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const homePic = [
  require("@/assets/images/home1.png"),
  require("@/assets/images/home2.jpg"),
  require("@/assets/images/home3.jpg"),
  require("@/assets/images/home4.jpg"),
  require("@/assets/images/home5.jpg"),
  require("@/assets/images/home6.jpg"),
];

export default function TabOneScreen() {
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    // Generate a random index when the component mounts
    const randomIndex = Math.floor(Math.random() * homePic.length);
    setRandomIndex(randomIndex);
  }, []);

  const getRandomImage = () => {
    // Return the image source based on the random index
    return homePic[randomIndex];
  };

  return (
    <View className="flex h-full relative">
      <View className="relative h-1/3">
        <Image source={getRandomImage()} className="w-full h-[105%]" />
        <Text
          className={`text-6xl font-montreau text-w1 absolute p-5 z-10 bottom-0 text-shadow-[0_2px_10px_#3a3c42] tracking-wider`}
        >
          Welcome Back, Brandon!
        </Text>
      </View>
      <ScrollView className="bg-w2 dark:bg-bl w-full p-[5%] flex justify-bottom h-2/3 rounded-t-2xl absolute bottom-0 ">
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
        <Text className="font-chivo text-3xl font-bold tracking-tight mt-5 text-bl dark:text-gr">
          What's up for Today?
        </Text>
        <View className="mt-5 w-full">
          <ScrollView horizontal={true} className="gap-5">
            <View className="p-2 aspect-square bg-w1 dark:bg-bl2 flex w-1/2 justify-center items-center rounded-lg">
              <Text className=" text-bl dark:text-w2 font-chivo text-lg ">
                Workout 1
              </Text>
            </View>
            <View className="p-2 aspect-square bg-w1 dark:bg-bl2 flex w-1/2 justify-center items-center rounded-lg">
              <Text className=" text-bl dark:text-w2 font-chivo text-lg">
                Workout 2
              </Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* <View
        style={styles.separator}
        lightColor="#000"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}
