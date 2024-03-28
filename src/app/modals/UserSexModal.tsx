import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";
import DatabaseManager from "../services/DatabaseManager"; // Adjust the import path as necessary
import { Iconify } from "react-native-iconify";

type UserSexModalProps = {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
};

const UserSexModal: React.FC<UserSexModalProps> = ({
  visible,
  onClose,
  onUpdate,
}) => {
  const colorScheme = useColorScheme();

  const [sex, setSex] = useState("");
  const iconColor = colorScheme === "dark" ? "#93cd64" : "#b33534";

  useEffect(() => {
    if (visible) {
      DatabaseManager.getUserProfile((success, data) => {
        if (success && Array.isArray(data) && data.length > 0) {
          setSex(data[0].sex);
        } else {
          console.log("No user profile data found or an error occurred");
        }
      });
    }
  }, [visible]);

  const saveSex = (newSex: string) => {
    DatabaseManager.setUserSex(newSex, (success, data) => {
      if (success) {
        console.log("Sex saved successfully");
        onUpdate();
        onClose();
      } else {
        console.error("Failed to save sex");
        Alert.alert("Error", "Failed to save sex");
      }
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex justify-center items-center h-full">
        <View className="bg-w1 p-8 rounded-xl w-[80%] shadow-md shadow-bl">
          <TouchableOpacity
            activeOpacity={0.7}
            className="absolute top-5 right-5"
            onPress={() => onClose()}
          >
            <Iconify icon="mingcute:close-fill" size={28} color={iconColor} />
          </TouchableOpacity>

          <Text className="text-bl dark:text-b1 text-2xl my-5 items-center text-center font-bold">
            Please select your sex:
          </Text>

          <TouchableOpacity
            onPress={() => saveSex("Male")}
            className="p-3 rounded-3xl flex items-center border-2 border-red mb-3"
          >
            <Text className="font-medium text-xl text-red dark:text-gr">
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => saveSex("Female")}
            className="p-3 rounded-3xl flex items-center border-2 border-red"
          >
            <Text className="font-medium text-xl text-red dark:text-gr">
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserSexModal;
