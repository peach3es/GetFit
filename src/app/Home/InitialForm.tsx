import React, { useCallback, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import UserNameModal from "../modals/UserNameModal";
import UserSexModal from "../modals/UserSexModal";
import UserDOBModal from "../modals/UserDOBModal";
import UserHeightModal from "../modals/UserHeightModal";
import UserWeightModal from "../modals/UserWeightModal";
import DatabaseManager from "../services/DatabaseManager";
import { differenceInYears } from "date-fns";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
// import { Header } from "react-native/Libraries/NewAppScreen";

export default function InitialForm() {
  // Header.setHidden(true);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [sexModalVisible, setSexModalVisible] = useState(false);
  const [dobModalVisible, setDOBModalVisible] = useState(false);
  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [weightModalVisible, setWeightModalVisible] = useState(false);

  const [userName, setUserName] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userDOB, setUserDOB] = useState("");
  const [userAge, setUserAge] = useState<number | null>(null);
  const [userHeight, setUserHeight] = useState<number | null>(null);
  const [userWeight, setUserWeight] = useState<number | null>(null);
  const router = useRouter();

  // Fetch user profile
  const fetchUserProfile = useCallback(() => {
    DatabaseManager.getUserProfile((success, data) => {
      if (success && Array.isArray(data) && data.length > 0) {
        const userProfile = data[0];
        setUserName(userProfile.name || "Username");
        setUserSex(userProfile.sex || "");
        setUserDOB(userProfile.dob || "");

        if (userProfile.dob) {
          const dob = new Date(userProfile.dob);
          const age = differenceInYears(new Date(), dob);
          setUserAge(age); // This will now set the age as a number
        }

        if (userProfile.height) {
          setUserHeight(userProfile.height); // Height is saved in centimeters
        } else {
          setUserHeight(null); // Reset height if it's not available
        }

        if (userProfile.weight) {
          setUserWeight(userProfile.weight); // Weight is saved in kilograms
        } else {
          setUserWeight(null); // Reset weight if it's not available
        }
      } else {
        console.error("Failed to fetch user profile");
        setUserName("Username"); // Default to "Username" if the fetch fails
        setUserSex("");
        setUserDOB("");
        setUserAge(null);
        setUserHeight(null);
        setUserWeight(null);
      }
    });
  }, []);

  const checkFormAndNavigate = () => {
    // Check all fields are non-null and non-empty
    if (
      !userName.trim() ||
      !userSex.trim() ||
      !userDOB.trim() ||
      userHeight === null ||
      userWeight === null
    ) {
      Alert.alert("Invalid Form", "All fields are required.");
    } else {
      // All fields are filled, navigate to the next screen
      router.push("/(tabs)");
    }
  };

  return (
    <View className="bg-w2 dark:bg-bl h-full p-8 justify-around">
      <View className="justify-start h-[20%] pt-16 ">
        <Text className="text-5xl font-montreau text-bl dark:text-w1 mb-2">
          Welcome to GetFit
        </Text>
        <Text className=" text-lg text-red dark:text-w1 pl-3 font-medium tracking-tight leading-5 mb-12">
          Please enter your details below to get started:
        </Text>
      </View>
      <View className="flex w-full p-5 rounded-xl bg-w1 dark:bg-bl2 h-fit">
        <Text className="text-red dark:text-gr font-medium text-lg ml-1 mb-2">
          Name:
        </Text>
        <TouchableOpacity onPress={() => setNameModalVisible(true)}>
          <Text className="h-12 w-full p-3 rounded-xl bg-w1 dark:bg-bl2 text-lg text-red dark:text-gr font-medium border-2 border-red dark:border-gr mb-[3%]">
            {userName}
          </Text>
        </TouchableOpacity>
        <Text className="text-red dark:text-gr font-medium text-lg ml-1 mb-2">
          Sex:
        </Text>
        <TouchableOpacity onPress={() => setSexModalVisible(true)}>
          <Text className="h-12 w-full p-3 rounded-xl bg-w1 dark:bg-bl2 text-lg text-red dark:text-gr font-medium border-2 border-red dark:border-gr mb-[5%]">
            {userSex}
          </Text>
        </TouchableOpacity>
        <Text className="text-red dark:text-gr font-medium text-lg ml-1 mb-2">
          Age:
        </Text>
        <TouchableOpacity onPress={() => setDOBModalVisible(true)}>
          <Text className="h-12 w-full p-3 rounded-xl bg-w1 dark:bg-bl2 text-lg text-red dark:text-gr font-medium border-2 border-red dark:border-gr mb-[5%]">
            {userAge}
          </Text>
        </TouchableOpacity>

        <Text className="text-red dark:text-gr font-medium text-lg ml-1 mb-2">
          Weight:
        </Text>
        <TouchableOpacity onPress={() => setWeightModalVisible(true)}>
          <Text className="h-12 w-full p-3 rounded-xl bg-w1 dark:bg-bl2 text-lg text-red dark:text-gr font-medium border-2 border-red dark:border-gr mb-[5%]">
            {userWeight !== null && (
              <Text className="h-12 w-full p-3 rounded-xl bg-w1 dark:bg-bl2 text-lg text-red dark:text-gr font-medium border-2 border-red dark:border-gr mb-[5%]">
                {userWeight.toFixed(1)} kg
              </Text>
            )}
          </Text>
        </TouchableOpacity>

        <Text className="text-red dark:text-gr font-medium text-lg ml-1 mb-2">
          Height:
        </Text>
        <TouchableOpacity onPress={() => setHeightModalVisible(true)}>
          <Text className="h-12 w-full p-3 rounded-xl bg-w1 dark:bg-bl2 text-lg text-red dark:text-gr font-medium border-2 border-red dark:border-gr mb-[5%]">
            {userHeight !== null && (
              <Text className="h-12 w-full p-3 rounded-xl bg-w1 dark:bg-bl2 text-lg text-red dark:text-gr font-medium border-2 border-red dark:border-gr mb-[5%]">
                {userHeight} cm
              </Text>
            )}
          </Text>
        </TouchableOpacity>
        <View className="w-full items-center mt-3">
          <TouchableOpacity
            className="bg-red p-3 rounded-3xl w-[40%] flex justify-center items-center"
            onPress={checkFormAndNavigate}
            activeOpacity={0.7}
          >
            <Text className="text-center text-w1 text-lg">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className=" text-xs text-bl dark:text-w1 pl-3 font-medium tracking-tight leading-2 text-center mt-[2%]">
        GetFit needs some basic information to get started. We do not have
        access to your data; it will never be shared with anyone.
      </Text>
      <UserNameModal
        visible={nameModalVisible}
        onClose={() => setNameModalVisible(false)}
        onUpdate={fetchUserProfile}
      />
      <UserSexModal
        visible={sexModalVisible}
        onClose={() => setSexModalVisible(false)}
        onUpdate={fetchUserProfile}
      />
      <UserDOBModal
        visible={dobModalVisible}
        onClose={() => setDOBModalVisible(false)}
        onUpdate={fetchUserProfile}
      />
      <UserHeightModal
        visible={heightModalVisible}
        onClose={() => setHeightModalVisible(false)}
        onUpdate={fetchUserProfile}
      />
      <UserWeightModal
        visible={weightModalVisible}
        onClose={() => setWeightModalVisible(false)}
        onUpdate={fetchUserProfile}
      />
    </View>
  );
}
