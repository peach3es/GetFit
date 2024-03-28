import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ImageRequireSource,
} from "react-native";
import { useRouter } from "expo-router";
import UserNameModal from "../modals/UserNameModal";
import UserSexModal from "../modals/UserSexModal";
import UserDOBModal from "../modals/UserDOBModal";
import UserHeightModal from "../modals/UserHeightModal";
import UserWeightModal from "../modals/UserWeightModal";
import DatabaseManager from "../services/DatabaseManager";
import { differenceInYears } from "date-fns";

type ItemData = { id: string; name: string };

const profile: ItemData[] = [
  {
    id: "name",
    name: "Name",
  },
  {
    id: "sex",
    name: "Sex",
  },
  {
    id: "dob",
    name: "Date of Birth",
  },
  {
    id: "height",
    name: "Height",
  },
  {
    id: "weight",
    name: "Weight",
  },
  {
    id: "history",
    name: "Workout History",
  },
];

type ProfilePageProps = {
  item: ItemData;
  style: string;
  onPress: () => void;
};

const ProfileOptions = ({ item, style, onPress }: ProfilePageProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      className={
        `bg-red dark:bg-gr py-5 flex justify-center items-center border-b-2 border-w2 dark:border-b-bl dark:border-b-2 ` +
        style
      }
    >
      <Text className="text-w1 dark:text-bl font-chivo text-lg text-center">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default function TabTwoScreen() {
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

  const handlePress = (item: ItemData) => {
    switch (item.id) {
      case "name":
        setNameModalVisible(true);
        break;
      case "sex":
        setSexModalVisible(true);
        break;
      case "dob":
        setDOBModalVisible(true);
        break;
      case "height":
        setHeightModalVisible(true);
        break;
      case "weight":
        setWeightModalVisible(true);
        break;
      case "history":
        // Use the router to navigate to the History page
        router.push("/Home/History");
        break;
      default:
        // Do nothing
        break;
    }
  };

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

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const renderItem = ({ item, index }: { item: ItemData; index: number }) => {
    const isFirstItem = index === 0;

    return (
      <ProfileOptions
        item={item}
        style={isFirstItem ? "rounded-t-xl" : ""} // Apply rounded-t-xl style only to the first item
        onPress={() => handlePress(item)}
      />
    );
  };

  return (
    <View className="flex items-center pt-24 h-full bg-w2 dark:bg-bl justify-between">
      <View className="flex h-fit items-center px-5 gap-y-5">
        <Text className="text-3xl font-bold text-bl dark:text-w2 text-center">
          Profile Page
        </Text>
        {/* <View className="rounded-full aspect-square w-40 bg-w1"></View> */}
        <Text className="text-4xl font-bold text-bl dark:text-w2 text-center">
          {userName}
        </Text>
        {/* Conditionally render the age if it is available */}
        {userAge !== null && (
          <Text style={{ marginBottom: -20, textAlign: "center" }}>
            Age: {userAge} {userAge === 1 ? "year" : "years"} old
          </Text>
        )}
        {/* Conditionally render the sex if it is available */}
        {userSex !== "" && (
          <Text
            style={{
              marginBottom: -20,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Sex: {userSex}
          </Text>
        )}
        {/* Conditionally render the height if it is available */}
        {userHeight !== null && (
          <Text style={{ marginBottom: -20, textAlign: "center" }}>
            Height: {userHeight} cm
          </Text>
        )}
        {/* Conditionally render the weight if it is available */}
        {userWeight !== null && (
          <Text style={{ textAlign: "center" }}>
            Weight: {userWeight.toFixed(2)} kg
          </Text>
        )}
      </View>
      <View className="w-full rounded-t-xl bg-w1 dark:bg-bl2 h-fit">
        <FlatList
          data={profile}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
    </View>
  );
}
