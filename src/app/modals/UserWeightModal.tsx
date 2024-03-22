import React, { useState, useEffect } from 'react';
import { Modal, View, Button, TextInput, Switch, Text } from 'react-native';
import DatabaseManager from '../services/DatabaseManager';

type UserWeightModalProps = {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
};

const UserWeightModal: React.FC<UserWeightModalProps> = ({ visible, onClose, onUpdate }) => {
  const [weight, setWeight] = useState('');
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    if (visible) {
      DatabaseManager.getUserProfile((success, data) => {
        if (success && Array.isArray(data) && data.length > 0) {
          const userProfile = data[0];
          const weightUnitPref = userProfile.weightUnitPref || 'metric';
          setIsMetric(weightUnitPref === 'metric');
  
          // If weight is not null, set it; otherwise, set an empty string
          if (userProfile.weight !== null) {
            const weightKg = userProfile.weight;
            setWeight(weightUnitPref === 'metric' ? weightKg.toString() : (weightKg * 2.20462).toFixed(2)); // Convert kg to lbs for display if imperial
          } else {
            setWeight(''); // If there is no weight, leave the field blank
          }
        } else {
          console.log("No user profile data found or an error occurred");
          setWeight(''); // Also set to an empty string if there's an error or no data
        }
      });
    }
  }, [visible]);

  const saveWeight = () => {
    // Only proceed if the weight input is not empty
    if (weight.trim() !== '') {
      let weightToSave = isMetric ? parseFloat(weight) : parseFloat(weight) / 2.20462; // Convert lbs to kg if imperial
      const unitPref = isMetric ? 'metric' : 'imperial';
  
      DatabaseManager.setUserWeightAndUnitPref(weightToSave, unitPref, (success, data) => {
        if (success) {
          console.log('Weight and unit preference saved successfully');
          onUpdate(); // Trigger any updates in the parent component
        } else {
          console.error('Failed to save weight and unit preference');
        }
      });
    }
    onClose(); // Close the modal regardless
  };

  const toggleUnit = (value: boolean | ((prevState: boolean) => boolean)) => {
    setIsMetric(value);
    setWeight(value ? (parseFloat(weight) / 2.20462).toFixed(2) : (parseFloat(weight) * 2.20462).toFixed(2));
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
          keyboardType="numeric"
          placeholder={isMetric ? "Enter your weight in kg" : "Enter your weight in lbs"}
          value={weight}
          onChangeText={setWeight}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
          <Text>{isMetric ? "Metric (kg)" : "Imperial (lbs)"}</Text>
          <Switch
            value={isMetric}
            onValueChange={toggleUnit}
          />
        </View>
        <Button title="Ok" onPress={saveWeight} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default UserWeightModal;
