import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Button,
  TextInput,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";
import DatabaseManager from "../services/DatabaseManager";

type UserWeightModalProps = {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
};

const UserWeightModal: React.FC<UserWeightModalProps> = ({
  visible,
  onClose,
  onUpdate,
}) => {
  const [weight, setWeight] = useState("");
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    if (visible) {
      DatabaseManager.getUserProfile((success, data) => {
        if (success && Array.isArray(data) && data.length > 0) {
          const userProfile = data[0];
          const weightUnitPref = userProfile.weightUnitPref || "metric";
          setIsMetric(weightUnitPref === "metric");

          // If weight is not null, set it; otherwise, set an empty string
          if (userProfile.weight !== null) {
            const weightKg = userProfile.weight;
            setWeight(
              weightUnitPref === "metric"
                ? weightKg.toString()
                : (weightKg * 2.20462).toFixed(2)
            ); // Convert kg to lbs for display if imperial
          } else {
            setWeight(""); // If there is no weight, leave the field blank
          }
        } else {
          console.log("No user profile data found or an error occurred");
          setWeight(""); // Also set to an empty string if there's an error or no data
        }
      });
    }
  }, [visible]);

  const saveWeight = () => {
    // Only proceed if the weight input is not empty
    if (weight.trim() !== "") {
      let weightToSave = isMetric
        ? parseFloat(weight)
        : parseFloat(weight) / 2.20462; // Convert lbs to kg if imperial
      const unitPref = isMetric ? "metric" : "imperial";

      DatabaseManager.setUserWeightAndUnitPref(
        weightToSave,
        unitPref,
        (success, data) => {
          if (success) {
            console.log("Weight and unit preference saved successfully");
            onUpdate(); // Trigger any updates in the parent component
          } else {
            console.error("Failed to save weight and unit preference");
          }
        }
      );
    }
    onClose(); // Close the modal regardless
  };

  const toggleUnit = (value: boolean | ((prevState: boolean) => boolean)) => {
    setIsMetric(value);
    setWeight(
      value
        ? (parseFloat(weight) / 2.20462).toFixed(2)
        : (parseFloat(weight) * 2.20462).toFixed(2)
    );
  };

  return (
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={visible}
    //   onRequestClose={onClose}
    // >
    //   <View style={{ marginTop: 50, padding: 20, backgroundColor: 'white' }}>
    //     <TextInput
    //       keyboardType="numeric"
    //       placeholder={isMetric ? "Enter your weight in kg" : "Enter your weight in lbs"}
    //       value={weight}
    //       onChangeText={setWeight}
    //     />
    //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
    //       <Text>{isMetric ? "Metric (kg)" : "Imperial (lbs)"}</Text>
    //       <Switch
    //         value={isMetric}
    //         onValueChange={toggleUnit}
    //       />
    //     </View>
    //     <Button title="Ok" onPress={saveWeight} />
    //     <Button title="Cancel" onPress={onClose} />
    //   </View>
    // </Modal>
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex justify-center items-center h-full">
        <View className="bg-w1 dark:bg-bl2 p-8 rounded-xl w-[80%]">
          <Text className="text-bl dark:text-gr text-2xl mb-5 items-center text-center">
            Weight
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder={
              isMetric ? "Enter your weight in kg" : "Enter your weight in lbs"
            }
            value={weight}
            onChangeText={setWeight}
            className="text-bl dark:text-gr text-xl border-2 border-red dark:border-gr h-12 rounded-xl text-center"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text className="text-bl dark:text-gr font-bold">
              {isMetric ? "Metric (kg)" : "Imperial (lbs)"}
            </Text>
            <Switch
              value={isMetric}
              onValueChange={toggleUnit}
              thumbColor={isMetric ? "#b33534" : ""}
              trackColor={{ true: "#b33534", false: "#b33534" }}
            />
          </View>
          <View className="flex flex-row justify-around">
            <TouchableOpacity
              className="bg-red dark:bg-gr p-3 rounded-3xl w-[40%] flex justify-center"
              onPress={saveWeight}
              activeOpacity={0.7}
            >
              <Text className="text-center text-w1 text-lg">Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red dark:bg-gr p-3 rounded-3xl w-[40%] flex justify-center"
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text className="text-center text-w1 text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserWeightModal;
