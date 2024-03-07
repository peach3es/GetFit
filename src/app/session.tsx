// import { Button } from "@gluestack-ui/themed";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";

const Session = () => {
  const route = useLocalSearchParams();
  const workoutName = route.workoutName || "Workout Name";
  return (
    <View className="flex h-full w-full p-5  bg-w2 dark:bg-bl">
      {/* <Text style={styles.title}>Modal</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <Text className="text-bl dark:text-w2 font-montreau text-4xl mt-36 text-bold">
        {workoutName}
      </Text>
      <View className="flex mt-10">
        <View>
          <Text className="text-bl dark:text-w2 text-7xl">Timer</Text>
        </View>
        <View className="mt-24">
          <Text className="text-bl dark:text-w2 text-3xl">Info</Text>
          <View className="p-5 bg-w1 dark:bg-bl2 rounded-lg h-32 mt-4"></View>
        </View>
      </View>
      <View className="flex flex-row mt-20 justify-evenly">
        <Button title="Pause" />
        <Button title="Stop" />
      </View>
    </View>
  );
};

export default Session;
