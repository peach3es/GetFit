import { StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="flex items-center px-10 pt-32 pb-10 h-full bg-w2">
      <View className="flex h-1/4">
        <Text className="text-3xl font-bold ">Profile Page</Text>
      </View>
      <View className="w-full rounded-xl bg-w1 h-3/4 p-5"></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
