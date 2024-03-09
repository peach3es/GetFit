import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useLocalSearchParams } from 'expo-router';

const Session = () => {
  const route = useLocalSearchParams();
  const workoutName = route.workoutName || 'Workout Name';
  const [isActive, setIsActive] = useState(true);
  const [time, setTime] = useState(0);

  // Create a new Date object and format it
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  useEffect(() => {
    if (workoutName) {
      handleReset();
      setIsActive(true);
    }
  }, [workoutName]);

  return (
    <View style={styles.container}>
      <Text style={styles.workoutName}>{workoutName}</Text>
      <Text style={styles.timerLabel}>Timer</Text>
      <Text style={styles.timer}>{new Date(time * 1000).toISOString().substr(11, 8)}</Text>
      <Text style={styles.infoLabel}>Info</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{formattedDate}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleStartStop}
          style={isActive ? styles.stopButton : styles.startButton}
        >
          <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  workoutName: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 36,
  },
  timerLabel: {
    fontSize: 28,
    marginTop: 40,
  },
  timer: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  infoLabel: {
    fontSize: 28,
    marginTop: 24,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    height: 128,
    marginTop: 16,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  infoText: {
    fontSize: 18,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-around',
  },
  startButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  stopButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  resetButton: {
    padding: 10,
    backgroundColor: 'darkgrey',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Session;
