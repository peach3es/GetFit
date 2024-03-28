import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  SafeAreaView,
  DeviceEventEmitter,
} from "react-native";
import "@/global.css";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import { Image } from "react-native";
import React, { useState, useEffect } from "react";
import Daily from "@/src/app/Home/Daily";
import Workouts from "@/src/app/Home/Workouts";
import DatabaseManager from "../services/DatabaseManager";
import { router } from "expo-router";

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
  const [userName, setUserName] = useState(""); // State to store the fetched userName

  useEffect(() => {
    // Generate a random index when the component mounts
    const randomIndex = Math.floor(Math.random() * homePic.length);
    setRandomIndex(randomIndex);
    fetchUserName();
    // Add listener for userName update event
    const subscription = DeviceEventEmitter.addListener(
      "userNameUpdated",
      fetchUserName
    );
    // Remove listener when component unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  const fetchUserName = () => {
    DatabaseManager.getUserProfile((success, data) => {
      if (success && Array.isArray(data) && data.length > 0) {
        setUserName(data[0].name); // Assuming the name property exists
      } else {
        // console.error("Failed to fetch user profile or no profile exists");
        router.push("/Home/InitialForm");
        // setUserName("Username"); // Set to Username if fetching fails
      }
    });
  };

  const getRandomImage = () => {
    // Return the image source based on the random index
    return homePic[randomIndex];
  };

  return (
    <View>
      <View className="flex h-full relative w-full">
        <View className="relative h-1/3">
          <Image source={getRandomImage()} className="w-full h-[110%]" />
          <Text
            className={`text-6xl font-montreau text-w1 absolute p-5 z-10 bottom-0 text-shadow-[0_2px_10px_#3a3c42] tracking-wider`}
          >
            Welcome Back, {userName}!
          </Text>
        </View>
        <SafeAreaView className="h-2/3" style={{ flex: 1 }}>
          <ScrollView
            className="w-full bg-w2 dark:bg-bl p-[5%] justify-bottom rounded-t-3xl"
            // style={{ flex: 1 }}
          >
            <Daily />
            <Workouts />
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}
