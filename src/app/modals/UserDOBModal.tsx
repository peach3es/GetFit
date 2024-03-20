import React, { useState, useEffect } from 'react';
import { Modal, View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Already installed for UserNameModal.tsx
import DatabaseManager from '../services/DatabaseManager'; // Adjust the import path as necessary

type UserDOBModalProps = {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
};

const UserDOBModal: React.FC<UserDOBModalProps> = ({ visible, onClose, onUpdate }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (visible) {
        setShowPicker(true);
        // Load the current DOB from the UserProfile database if available
        DatabaseManager.getUserProfile((success, data) => {
        if (success && Array.isArray(data) && data.length > 0 && data[0].dob) {
            setDate(new Date(data[0].dob));
        }
        });
    }
  }, [visible]);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "set") { // Check if 'set' (OK button on Android)
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
            console.log('DOB saved successfully');
            onUpdate(); // Trigger any updates in the parent component
        } else {
            console.error('Failed to save DOB');
        }
        onClose(); // Ensure modal closes after saving
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ marginTop: 50, padding: 20, backgroundColor: 'white' }}>
        {Platform.OS === 'android' && (
          <Button title="Select Date of Birth" onPress={() => setDate(new Date())} /> // This button is only to show the picker in Android
        )}
        {showPicker && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            maximumDate={new Date()} // Users can't be born in the future
            />
        )}
      </View>
    </Modal>
  );
};

export default UserDOBModal;