import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Alert } from 'react-native';
import DatabaseManager from '../services/DatabaseManager'; // Adjust the import path as necessary

type UserSexModalProps = {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
};

const UserSexModal: React.FC<UserSexModalProps> = ({ visible, onClose, onUpdate }) => {
  const [sex, setSex] = useState('');

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
        console.log('Sex saved successfully');
        onUpdate();
        onClose();
      } else {
        console.error('Failed to save sex');
        Alert.alert('Error', 'Failed to save sex');
      }
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
        <Text>Please select your sex:</Text>
        <TouchableOpacity onPress={() => saveSex('Male')}>
          <Text style={{ padding: 10, backgroundColor: sex === 'Male' ? '#DDD' : '#FFF' }}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => saveSex('Female')}>
          <Text style={{ padding: 10, backgroundColor: sex === 'Female' ? '#DDD' : '#FFF' }}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text style={{ padding: 10 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default UserSexModal;
