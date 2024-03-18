import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useLocalSearchParams, Link } from "expo-router";
import DatabaseManager from "./services/DatabaseManager";
import workout from "./Home/Workouts";

const Session: React.FC = () => {
  const route = useLocalSearchParams();
  const workoutName = Array.isArray(route.workoutName)
    ? route.workoutName[0]
    : route.workoutName || "Workout Name";
  const [isActive, setIsActive] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Create a new Date object and format it
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const handleStartStop = () => {
    if (isActive) {
      // If the timer is currently active (running), then we pause it
      setIsActive(false);
    } else {
      // If the timer is not active (paused), then we start it without changing the startTime
      setIsActive(true);
      // If it's the first start (startTime is null), record the startTime
      if (!startTime) {
        setStartTime(new Date());
      }
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setStartTime(null);
  };

  const handleSave = () => {
    if (startTime == null) {
      return;
    } else {
      const activity = createActivity();
      DatabaseManager.addActivity(activity, (success, result) => {
        if (success) {
          console.log("Activity data saved:", result);
        } else {
          console.log("Error saving activity data:", result);
        }
      });

      setIsActive(false);
      setTime(0);
      setStartTime(null);
    }
  };

  useEffect(() => {
    if (workoutName) {
      handleReset();
      setIsActive(true);
      setStartTime(new Date());
    }
  }, [workoutName]);

  const createActivity = () => {
    const endTime = new Date();

    // Format startTime and endTime (Ex.: 9:41 pm)
    const formattedStartTime = startTime
      ? startTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "";
    const formattedEndTime = endTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return {
      date: formattedDate,
      type: workoutName,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      duration: time,
      heartRateAverage: null, // Update with actual data later
      steps: null, // Update with actual data later
      caloriesBurned: null, // Update with actual data later
    };
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="bg-w2 dark:bg-bl h-full">
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
            <Text className="text-center text-xl font-bold text-bl dark:text-w1">
              Are you sure you want to end your workout?
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
                  pathname: "/(tabs)",
                }}
                asChild
              >
                <TouchableOpacity
                  className="bg-gr p-3 rounded-3xl w-[40%] flex justify-center"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    handleSave();
                  }}
                  activeOpacity={0.7}
                >
                  <Text className="text-center text-w1 text-lg">End</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </Modal>
      <View className="flex h-4/5 w-full p-5">
        <Text className="text-bl dark:text-w2 font-montreau text-5xl mt-44 text-bold">
          {workoutName}
        </Text>
        <View className="mt-14 flex">
          <Text className="text-bl dark:text-w2 text-4xl">Timer</Text>
          <Text className="text-bl dark:text-w2 text-lg mt-2 pl-1">
            {formattedDate}
          </Text>
          <Text className="text-bl dark:text-w2 text-7xl mt-5">
            {new Date(time * 1000).toISOString().substr(11, 8)}{" "}
          </Text>
        </View>
        <View className="flex flex-row mt-16 justify-evenly">
          <TouchableOpacity
            onPress={handleStartStop}
            className={`rounded-full aspect-square w-20 flex justify-center items-center ${
              isActive ? "bg-red" : "bg-gr"
            }`}
            activeOpacity={0.6}
          >
            <Text className="text-center text-w1 font-bold">
              {isActive ? "Stop" : "Start"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReset}
            style={styles.resetButton}
            className="rounded-full aspect-square w-20 flex justify-center items-center"
            activeOpacity={0.6}
          >
            <Text className="text-center font-bold">Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.saveButton}
            className="rounded-full aspect-square w-20 flex justify-center items-center"
            activeOpacity={0.6}
          >
            <Text className="text-center text-w1 font-bold">End</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex h-1/5 bg-w1 dark:bg-bl2 rounded-t-xl"></View>
    </View>
  );
};

const styles = StyleSheet.create({
  startButton: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  stopButton: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  resetButton: {
    padding: 10,
    backgroundColor: "darkgrey",
    borderRadius: 5,
  },
  saveButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
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
});

export default Session;
