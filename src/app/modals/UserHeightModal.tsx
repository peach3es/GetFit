import React, { useState, useEffect } from "react";
import { Modal, View, Switch, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DatabaseManager from "../services/DatabaseManager";

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
  const [isMetric, setIsMetric] = useState(true);
  const [centimeters, setCentimeters] = useState(69);
  const [feet, setFeet] = useState(2);
  const [inches, setInches] = useState(3);
  // Adjust the ranges based on the min and max values
  const cmArray = Array.from({ length: 204 }, (_, i) => 69 + i); // 69 to 272 cm
  // For feet and inches, dynamically adjust based on selection
  const getFeetArray = () => Array.from({ length: 7 }, (_, i) => 2 + i); // 2 to 8 feet
  const getInchesArray = (selectedFeet: number) => {
    if (selectedFeet === 2) {
      return Array.from({ length: 9 }, (_, i) => 3 + i); // 3 to 11 inches if feet is 2
    } else {
      return Array.from({ length: 12 }, (_, i) => i); // 0 to 11 inches otherwise
    }
  };

  useEffect(() => {
    if (visible) {
      DatabaseManager.getUserProfile((success, data) => {
        if (success && Array.isArray(data) && data.length > 0) {
          const userProfile = data[0];
          const heightUnitPref = userProfile.heightUnitPref || "metric";
          setIsMetric(heightUnitPref === "metric");
          const heightValue = Math.max(
            69,
            Math.min(userProfile.height || 0, 272)
          );

          if (heightUnitPref === "metric") {
            setCentimeters(heightValue);
          } else {
            const { feet, inches } = convertCmToFtIn(heightValue);
            setFeet(feet);
            setInches(inches);
          }
        } else {
          // Set to minimum values by default
          setCentimeters(69);
          setFeet(2);
          setInches(3);
        }
      });
    }
  }, [visible]);

  const convertCmToFtIn = (cm: number) => {
    const totalInches = cm / 2.54;
    let feet = Math.floor(totalInches / 12);
    let inches = totalInches % 12;

    // Check for edge case where inches are almost zero but due to floating-point arithmetic they're slightly less than 0.5
    if (Math.abs(inches - 0) < 0.5) {
      inches = 0; // Reset inches to zero if they're less than half an inch
    } else {
      inches = Math.round(inches); // Round to nearest whole number for any other case
    }

    // If we have a scenario where inches rounded to 12, that should actually increment the feet by 1 and reset inches to 0
    if (inches >= 12) {
      feet += 1;
      inches = 0;
    }

    return { feet, inches };
  };

  const convertFtInToCm = (feet: number, inches: number) => {
    const totalInches = feet * 12 + inches;
    // Convert total inches to cm
    return Math.round(totalInches * 2.54);
  };

  const toggleUnit = (value: boolean) => {
    setIsMetric(value);
    if (value) {
      // Convert from feet and inches to centimeters
      setCentimeters(convertFtInToCm(feet, inches));
    } else {
      // Convert from centimeters to feet and inches
      const conversion = convertCmToFtIn(centimeters);
      setFeet(conversion.feet);
      setInches(conversion.inches);
    }
  };

  const onFeetChange = (value: number) => {
    // Directly updating the feet and handling inches within the same state change
    setFeet(value);
    if (value === 2 && inches < 3) {
      setInches(3);
    } else if (value === 8 && inches > 11) {
      setInches(11);
    }
  };

  const onInchesChange = (value: number) => {
    // Directly updating the inches state
    setInches(value);
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
            Height
          </Text>
          {isMetric ? (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Picker
                selectedValue={centimeters}
                onValueChange={(itemValue: any) => setCentimeters(itemValue)}
                style={{ height: 50, width: 133 }}
              >
                {cmArray.map((value) => (
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
                onValueChange={onFeetChange}
                style={{ height: 50, width: 115 }}
              >
                {getFeetArray().map((value) => (
                  <Picker.Item
                    label={`${value} ft`}
                    value={value}
                    key={value}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={inches}
                onValueChange={onInchesChange}
                style={{ height: 50, width: 115 }}
              >
                {getInchesArray(feet).map((value) => (
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
