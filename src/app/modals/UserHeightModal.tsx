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
import DatabaseManager from "../services/DatabaseManager"; // Adjust the import path as necessary

type UserHeightModalProps = {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
};

const UserHeightModal: React.FC<UserHeightModalProps> = ({
  visible,
  onClose,
  onUpdate,
}) => {
  const [height, setHeight] = useState("");
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    if (visible) {
      DatabaseManager.getUserProfile((success, data) => {
        if (success && Array.isArray(data) && data.length > 0) {
          const userProfile = data[0];
          const heightUnitPref = userProfile.heightUnitPref || "metric";
          setIsMetric(heightUnitPref === "metric");

          // If height is not null, set it; otherwise, set an empty string
          if (userProfile.height !== null) {
            const heightCm = userProfile.height;
            setHeight(
              heightUnitPref === "metric"
                ? heightCm.toString()
                : convertCmToFtIn(heightCm)
            );
          } else {
            setHeight("");
          }
        } else {
          console.log("No user profile data found or an error occurred");
          setHeight("");
        }
      });
    }
  }, [visible]);

  const convertCmToFtIn = (cm: number): string => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`; // Returns the string in the format X'Y"
  };

  const convertDecimalFeetToCm = (decimalFeet: string): number => {
    const feet = Math.floor(parseFloat(decimalFeet));
    const inches = Math.round((parseFloat(decimalFeet) - feet) * 12); // Assumes the decimal part represents inches
    return (feet * 12 + inches) * 2.54;
  };

  const saveHeight = () => {
    let heightToSave = isMetric
      ? parseFloat(height)
      : convertDecimalFeetToCm(height);
    const unitPref = isMetric ? "metric" : "imperial";

    DatabaseManager.setUserHeightAndUnitPref(
      heightToSave,
      unitPref,
      (success, data) => {
        if (success) {
          console.log("Height and unit preference saved successfully");
          onUpdate();
          onClose();
        } else {
          console.error("Failed to save height and unit preference");
        }
      }
    );
  };

  const toggleUnit = (value: boolean) => {
    setIsMetric(value);

    // Determine the conversion based on the current and new unit settings
    let newHeight = "";
    if (height) {
      if (isMetric && !value) {
        // If we're currently in metric and switching to imperial, convert from cm to ft/in
        const cmValue = parseFloat(height);
        if (!isNaN(cmValue)) {
          newHeight = convertCmToFtIn(cmValue);
        }
      } else if (!isMetric && value) {
        // If we're currently in imperial (as a decimal) and switching to metric, convert from ft/in to cm
        newHeight = convertDecimalFeetToCm(height).toString();
      }
    }

    setHeight(newHeight || "");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex justify-center items-center h-full">
        <View className="bg-w1 dark:bg-bl2 p-8 rounded-xl w-[80%]">
          <Text className="text-bl dark:text-gr text-2xl mb-5 items-center text-center">
            Height
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder={
              isMetric
                ? "Enter your height in cm"
                : "Enter your height as ft.in"
            }
            value={height}
            onChangeText={setHeight}
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
              {isMetric ? "Metric (cm)" : "Imperial (ft.in)"}
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
              onPress={saveHeight}
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

export default UserHeightModal;
