import { Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="flex items-center justify-around h-full bg-w2 dark:bg-bl py-10">
      <View className=" justify-center h-1/5 ">
        <Text className="text-4xl font-montreau text-bl dark:text-w2 text-center ">
          Progress
        </Text>
      </View>
      <View className="w-full h-4/5 flex flex-col px-5">
        <View className="h-1/2 rounded-xl bg-w1 dark:bg-bl2 p-5 mb-5">
          <Text>chart 1</Text>
        </View>
        <View className="h-1/2 rounded-xl bg-w1 dark:bg-bl2 p-5 ">
          <Text>chart 2</Text>
        </View>
      </View>
    </View>
  );
}
