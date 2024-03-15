import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ImageRequireSource,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { Link, useNavigation } from "expo-router";
import { set } from "@gluestack-style/react";

type ItemData = { id: string; name: string; image: ImageRequireSource };

export const workout: ItemData[] = [
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
];

type WorkoutActivityProps = {
  item: ItemData;
  // setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkoutActivity = ({ item }: WorkoutActivityProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className="rounded-lg bg-w1 dark:bg-bl2 aspect-square w-36 mr-3 flex justify-center items-center"
      onPress={() => setModalVisible(true)}
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
            className="flex flex-col gap-y-5 bg-w1 dark:bg-bl h-fit justify-center align-center p-5"
          >
            <Text className="text-center text-xl font-bold text-bl dark:text-gr">
              Ready to start your workout?{" "}
            </Text>
            <View className="flex flex-row gap-x-5 justify-center">
              <TouchableOpacity
                className="bg-red p-3 rounded-3xl w-[40%] flex justify-center"
                onPress={() => setModalVisible(!modalVisible)}
                activeOpacity={0.7}
              >
                <Text className="text-center text-w1 text-lg">No</Text>
              </TouchableOpacity>
              <Link
                href={{
                  pathname: "/session",
                  params: { workoutName: item.name },
                }}
                asChild
              >
                <TouchableOpacity
                  className="bg-gr p-3 rounded-3xl w-[40%] flex justify-center"
                  onPress={() => setModalVisible(!modalVisible)}
                  activeOpacity={0.7}
                >
                  <Text className="text-center text-w1 text-lg">Start</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default function Workouts() {
  // const startWorkout = ({ item }: { item: ItemData }) => {
  //   return (

  //   );
  // };
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
    width: "75%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "30%",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
