import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Iconify } from "react-native-iconify";
import { useColorScheme } from "react-native";
import { Link } from "expo-router";

export default function WorkoutCard({
  date,
  type,
  startTime,
  endTime,
  duration,
  steps,
}: {
  date: string;
  type: string;
  startTime: any;
  endTime: any;
  duration: number;
  steps: number;
}) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#93cd64" : "#b33534";
  const [modalVisible, setModalVisible] = useState(false);

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  const formattedDuration = `${hours}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(true)}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={styles.modalView}
            className="flex flex-col bg-w1 dark:bg-bl h-fit justify-center p-5 w-full"
          >
            <TouchableOpacity
              activeOpacity={0.7}
              className="absolute top-5 right-5"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Iconify icon="mingcute:close-fill" size={32} color={iconColor} />
            </TouchableOpacity>
            <View className="items-center">
              <View className="rounded-full w-20 aspect-square my-3 bg-w2 dark:bg-bl items-center justify-center">
                {type === "Running" && (
                  <Iconify
                    icon="ph:person-simple-run-fill"
                    size={54}
                    color={iconColor}
                  />
                )}
                {type === "Hiking" && (
                  <Iconify
                    icon="ph:mountains-fill"
                    size={54}
                    color={iconColor}
                  />
                )}
                {type === "Weight Training" && (
                  <Iconify icon="ph:barbell-fill" size={54} color={iconColor} />
                )}
              </View>
            </View>
            <Text className="text-center text-4xl text-bl dark:text-gr font-montreau">
              {type}
            </Text>
            <Text className="text-center text-bl2 mb-5">
              {startTime}-{endTime}
            </Text>
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-col items-center">
                <Text className="text-lg font-medium">Workout Time</Text>
                <Text className="text-3xl font-medium">
                  {formattedDuration}
                </Text>
                <Text className="text-lg font-medium">Calories Burned</Text>
              </View>
              <View className="flex flex-col items-center">
                <Text className="text-lg font-medium">Avg. Heart Rate</Text>
                <Text className="text-lg font-medium">Steps Taken</Text>
                <Text className="text-3xl font-medium">{steps}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View className="rounded-xl bg-w1 dark:bg-bl2 mb-2 flex flex-row p-5 justify-between">
        <View className="flex flex-row">
          <View className="rounded-full w-16 aspect-square bg-w2 dark:bg-bl mr-5 items-center justify-center">
            {type === "Running" && (
              <Iconify
                icon="ph:person-simple-run-fill"
                size={48}
                color={iconColor}
              />
            )}
            {type === "Hiking" && (
              <Iconify icon="ph:mountains-fill" size={48} color={iconColor} />
            )}
            {type === "Weight Training" && (
              <Iconify icon="ph:barbell-fill" size={48} color={iconColor} />
            )}
          </View>
          <View className="flex flex-col">
            <Text className="font-bold text-xl mb-4 text-bl dark:text-w1">
              {type}
            </Text>
            <View className="flex flex-row gap-x-6">
              <View className="flex flex-row justify-center items-center">
                <Iconify icon="ph:fire-fill" size={22} color={iconColor} />
                <Text className="font-bold text-sm ml-2 text-bl dark:text-w1">
                  kcal
                </Text>
              </View>
              <View className="flex flex-row justify-center items-center">
                <Iconify icon="ph:timer-fill" size={22} color={iconColor} />
                <Text className="font-bold text-sm ml-2 text-bl dark:text-w1">
                  {duration} sec
                </Text>
              </View>
              <View className="flex flex-row justify-center items-center">
                <Iconify icon="ph:heartbeat-fill" size={22} color={iconColor} />
                <Text className="font-bold text-sm ml-2 text-bl dark:text-w1">
                  bpm
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex flex-col absolute top-5 right-5">
          <Text className="font-bold text-bl dark:text-w1">{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  modalView: {
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
});
