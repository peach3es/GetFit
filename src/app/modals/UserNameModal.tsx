import React, { useState, useEffect } from "react";
import { Modal, View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import DatabaseManager from "../services/DatabaseManager";
import { DeviceEventEmitter } from "react-native";

type UserNameModalProps = {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
};

const UserNameModal: React.FC<UserNameModalProps> = ({
  visible,
  onClose,
  onUpdate,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (visible) {
      DatabaseManager.getUserProfile((success, data) => {
        if (success && Array.isArray(data) && data.length > 0) {
          setName(data[0].name.trim());
        } else {
          console.log("No user profile data found or an error occurred");
        }
      });
    }
  }, [visible]);

  const handleNameChange = (newName: string) => {
    // Limit the length of the name to 20 characters and allow letters, spaces, and accents
    const lettersSpacesAndAccents = newName.replace(/[^\p{L}\p{M}\s]/gu, '');
    const trimmedName = lettersSpacesAndAccents.length <= 20 ? lettersSpacesAndAccents : lettersSpacesAndAccents.slice(0, 20);
    setName(trimmedName);
  };
  

  const saveName = () => {
    const trimmedName = name.trim(); // Remove any leading or trailing spaces
    if (!trimmedName || !trimmedName.replace(/\s/g, '').length) {
      // If the name is empty, only contains spaces, or has invalid characters
      Alert.alert("Invalid Name", "Enter a name containing letters only.");
    } else {
      // Save the trimmed name
      DatabaseManager.setUserName(trimmedName, (success, data) => {
        if (success) {
          console.log("Name saved successfully");
          DeviceEventEmitter.emit("userNameUpdated");
          onUpdate();
          onClose();
        } else {
          console.error("Failed to save name");
        }
      });
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
        <View className="bg-w1 p-5 rounded-xl w-[75%] shadow-md shadow-bl">
          <Text className="text-bl dark:text-b1 text-2xl mb-5 items-center text-center">
            What is your name?
          </Text>

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={handleNameChange}
            className="text-bl dark:text-w1 mb-5 text-xl mx-3 h-14 border-2 items-center px-5 rounded-2xl"
          />

          <View className="flex flex-row justify-around">
            <TouchableOpacity
              className="bg-red p-3 rounded-3xl w-[40%] flex justify-center"
              onPress={saveName}
              activeOpacity={0.7}
            >
              <Text className="text-center text-w1 text-lg">Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red p-3 rounded-3xl w-[40%] flex justify-center"
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

export default UserNameModal;
