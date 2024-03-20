import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button} from 'react-native';
import DatabaseManager from '../services/DatabaseManager';
import { DeviceEventEmitter } from 'react-native';

type UserNameModalProps = {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
};

const UserNameModal: React.FC<UserNameModalProps> = ({ visible, onClose, onUpdate }) => {
    const [name, setName] = useState('');

    useEffect(() => {
      if (visible) {
        DatabaseManager.getUserProfile((success, data) => {
            if (success && Array.isArray(data) && data.length > 0) {
                setName(data[0].name);
            } else {
                console.log("No user profile data found or an error occurred");
            }
        });
      }
    }, [visible]);

    const saveName = () => {
        DatabaseManager.setUserName(name, (success, data) => {
          if (success) {
            console.log('Name saved successfully');
            DeviceEventEmitter.emit('userNameUpdated');
            onUpdate();
            onClose();
          } else {
            console.error('Failed to save name');
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
            <TextInput
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            <Button title="Ok" onPress={saveName} />
            <Button title="Close" onPress={onClose} />
          </View>
        </Modal>
      );
};

export default UserNameModal;
