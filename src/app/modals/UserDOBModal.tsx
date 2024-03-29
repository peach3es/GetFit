import React, { useState, useEffect } from "react";
import { Modal, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatabaseManager from "../services/DatabaseManager"; 

type UserDOBModalProps = {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
};

const UserDOBModal: React.FC<UserDOBModalProps> = ({
  visible,
  onClose,
  onUpdate,
}) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const today = new Date();
  // Calculate 6 years before today's date for the maximumDate
  const maxDate = new Date(today.getFullYear() - 6, today.getMonth(), today.getDate());
  // Calculate 122 years before today's date for the minimumDate
  const minDate = new Date(today.getFullYear() - 122, today.getMonth(), today.getDate());

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (visible) {
      timer = setTimeout(() => {
        setShowPicker(true);
      }, 100);
      // Load the current DOB from the UserProfile database if available
      DatabaseManager.getUserProfile((success, data) => {
        if (success && Array.isArray(data) && data.length > 0 && data[0].dob) {
          setDate(new Date(data[0].dob));
        }
      });
    } else {
      setShowPicker(false);
    }

    return () => {
      clearTimeout(timer);
    }
  }, [visible]);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "set") {
      // Check if 'set' (OK button on Android)
      const currentDate = selectedDate || date;
      setDate(currentDate); // Update state
      saveDOB(currentDate); // Save the DOB
    } else {
      setShowPicker(false);
      onClose(); // Close the modal without saving if 'cancel' is pressed
    }
  };

  const saveDOB = (selectedDate: Date) => {
    const isoDate = selectedDate.toISOString();
    DatabaseManager.setUserDOB(isoDate, (success, data) => {
      if (success) {
        console.log("DOB saved successfully");
        onUpdate(); // Trigger any updates in the parent component
      } else {
        console.error("Failed to save DOB");
      }
      setShowPicker(false);
      onClose(); // Ensure modal closes after saving
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
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            maximumDate={maxDate}
            minimumDate={minDate}
            // className="bg-w1 dark:bg-bl dark:text-w1 text-bl w-full"
          />
        )}
      </View>
    </Modal>
  );
};

export default UserDOBModal;
