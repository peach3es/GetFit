import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  View,
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

const MAX_WEIGHT_KG = 272.0; // Maximum weight in kilograms
const MIN_WEIGHT_KG = 30.0; // Minimum weight in kilograms
const MAX_WEIGHT_LBS = MAX_WEIGHT_KG * 2.20462; // Convert maximum weight to pounds
const MIN_WEIGHT_LBS = MIN_WEIGHT_KG * 2.20462; // Convert minimum weight to pounds

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

  const toggleUnit = (value: boolean) => {
    setIsMetric(value);

    // Check if the current weight is a number before converting
    const currentWeight = parseFloat(weight);
    if (!isNaN(currentWeight)) {
      const convertedWeight = value
        ? Math.min(
            Math.max(currentWeight / 2.20462, MIN_WEIGHT_KG),
            MAX_WEIGHT_KG
          ).toFixed(2)
        : Math.min(
            Math.max(currentWeight * 2.20462, MIN_WEIGHT_LBS),
            MAX_WEIGHT_LBS
          ).toFixed(2);

      setWeight(convertedWeight);
    } else {
      setWeight(""); // If it's not a number, set it to an empty string
    }
  };

  const saveWeight = () => {
    const numericWeight = parseFloat(weight);
    if (isNaN(numericWeight)) {
      Alert.alert("Invalid Weight", "Entered weight is not a number.");
      return; // Early return if not a valid number
    }

    const weightInKg = isMetric ? numericWeight : numericWeight / 2.20462;
    const unitPref = isMetric ? "metric" : "imperial";
    const minWeight = isMetric ? MIN_WEIGHT_KG : MIN_WEIGHT_LBS;
    const maxWeight = isMetric ? MAX_WEIGHT_KG : MAX_WEIGHT_LBS;

    // Validate weight is within the allowed range
    if (
      numericWeight < minWeight ||
      (numericWeight > maxWeight && numericWeight != 599.66)
    ) {
      const weightType = unitPref === "imperial" ? "lbs" : "kg";
      Alert.alert(
        "Invalid Weight",
        `Weight must be between ${minWeight.toFixed(2)} and ${maxWeight.toFixed(
          2
        )} ${weightType}.`
      );
      return; // Early return if weight is outside the valid range
    }

    // Save weight and unit preference
    DatabaseManager.setUserWeightAndUnitPref(
      weightInKg,
      unitPref,
      (success, data) => {
        if (success) {
          console.log("Weight and unit preference saved successfully");
          onUpdate();
          onClose();
        } else {
          console.error("Failed to save weight and unit preference");
        }
      }
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex justify-center items-center h-full">
        <View className="bg-w1 dark:bg-bl2 p-8 rounded-xl w-[80%] shadow-md shadow-bl">
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
