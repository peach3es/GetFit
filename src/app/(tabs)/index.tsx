import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
// import { ScrollView } from "@gluestack-ui/themed";
import "@/global.css";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import { Image } from "react-native";
// import { getColors } from "react-native-image-colors";
import React, { useState, useEffect } from "react";
import Workouts from "@/src/components/Home/Workouts";
import Daily from "@/src/components/Home/Daily";

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
    <View>
      <View className="flex h-full relative w-full">
        <View className="relative h-1/3">
          <Image source={getRandomImage()} className="w-full h-[105%]" />
          <Text
            className={`text-6xl font-montreau text-w1 absolute p-5 z-10 bottom-0 text-shadow-[0_2px_10px_#3a3c42] tracking-wider`}
          >
            Welcome Back, Brandon!
          </Text>
        </View>
        <View className="bg-w2 dark:bg-bl w-full p-[5%] flex justify-bottom h-3/4 max-h-screen rounded-t-2xl">
          <ScrollView className="w-full">
            <Daily />
            <Workouts />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
