// import React, { useState, useEffect } from 'react';
// import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

// const Stopwatch = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [isPaused, setIsPaused] = useState(true);
//   const [time, setTime] = useState(0);

//   useEffect(() => {
//     let interval: any = null;

//     if (isActive && isPaused === false) {
//       interval = setInterval(() => {
//         setTime((time) => time + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => {
//       clearInterval(interval);
//     };
//   }, [isActive, isPaused]);

//   const handleStart = () => {
//     setIsActive(true);
//     setIsPaused(false);
//   };

//   const handleStop = () => {
//     setIsActive(false);
//     setTime(0);
//   };

//   const handlePauseResume = () => {
//     setIsPaused(!isPaused);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.timer}>{new Date(time * 1000).toISOString().substr(11, 8)}</Text>
//       <TouchableOpacity style={styles.button} onPress={handleStart}>
//         <Text>{isActive ? 'Pause' : 'Start'}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handlePauseResume} disabled={!isActive}>
//         <Text>{isPaused ? 'Resume' : 'Pause'}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleStop} disabled={!isActive}>
//         <Text>Stop</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   timer: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     marginVertical: 30,
//   },
//   button: {
//     margin: 10,
//     paddingHorizontal: 30,
//     paddingVertical: 10,
//     backgroundColor: 'blue',
//     borderRadius: 5,
//   },
// });

// export default Stopwatch;
