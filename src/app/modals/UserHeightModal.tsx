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
import { Picker } from "@react-native-picker/picker";
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
  const [centimeters, setCentimeters] = useState(0);
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);
  const cmArray = Array.from({ length: 273 }, (_, i) => i);
  const feetArray = Array.from({ length: 9 }, (_, i) => i);
  const inchesArray = Array.from({ length: 12 }, (_, i) => i);

  useEffect(() => {
    if (visible) {
      DatabaseManager.getUserProfile((success, data) => {
        if (success && Array.isArray(data) && data.length > 0) {
          const userProfile = data[0];
          const heightUnitPref = userProfile.heightUnitPref || "metric";
          setIsMetric(heightUnitPref === "metric");
          const heightValue = userProfile.height || 0;

          // If the user preference is metric, set the centimeters directly
          if (heightUnitPref === "metric") {
            setCentimeters(heightValue);
          } else {
            // If the user preference is imperial, convert centimeters to feet and inches and set them
            const { feet, inches } = convertCmToFtIn(heightValue);
            setFeet(feet);
            setInches(inches);
          }
        } else {
          console.log("No user profile data found or an error occurred");
          // Set default or empty values if no height is found
          setCentimeters(0);
          setFeet(0);
          setInches(0);
        }
      });
    }
  }, [visible]);

  const convertCmToFtIn = (cm: number) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  const convertFtInToCm = (feet: number, inches: number) => {
    return Math.round((feet * 12 + inches) * 2.54);
  };

  const saveHeight = () => {
    const heightToSave = isMetric ? centimeters : convertFtInToCm(feet, inches);
    const heightUnitPref = isMetric ? "metric" : "imperial";

    DatabaseManager.setUserHeightAndUnitPref(
      heightToSave,
      heightUnitPref,
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
    if (value) {
      // Convert from feet and inches to centimeters
      const cmValue = convertFtInToCm(feet, inches);
      setCentimeters(cmValue);
    } else {
      // Convert from centimeters to feet and inches
      const { feet: ft, inches: inc } = convertCmToFtIn(centimeters);
      setFeet(ft);
      setInches(inc);
    }
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
          {isMetric ? (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Picker
                selectedValue={centimeters}
                onValueChange={(itemValue: any) => setCentimeters(itemValue)}
                style={{ height: 50, width: 133 }}
              >
                {Array.from({ length: 273 }, (_, i) => i).map((value) => (
                  <Picker.Item
                    label={`${value} cm`}
                    value={value}
                    key={value}
                  />
                ))}
              </Picker>
            </View>
          ) : (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Picker
                selectedValue={feet}
                onValueChange={(itemValue: any) => setFeet(itemValue)}
                style={{ height: 50, width: 115 }}
              >
                {Array.from({ length: 9 }, (_, i) => i).map((value) => (
                  <Picker.Item
                    label={`${value} ft`}
                    value={value}
                    key={value}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={inches}
                onValueChange={(itemValue: any) => setInches(itemValue)}
                style={{ height: 50, width: 115 }}
              >
                {Array.from({ length: 12 }, (_, i) => i).map((value) => (
                  <Picker.Item
                    label={`${value} in`}
                    value={value}
                    key={value}
                  />
                ))}
              </Picker>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text className="text-bl dark:text-gr font-bold">
              {isMetric ? "Metric (cm)" : "Imperial (ft'in\")"}
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
