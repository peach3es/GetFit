import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { Iconify } from "react-native-iconify";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const iconColor = colorScheme === "dark" ? "#93cd64" : "#b33534";
  const backgroundColor = colorScheme === "dark" ? "#5b6068" : "#FAFCEE";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,

          paddingTop: 5,
          height: "7%",
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false, //Shows Top header or not
          tabBarIcon: ({ color }) => (
            <Iconify
              icon={"solar:home-smile-angle-line-duotone"}
              size={36}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "",
          headerShown: false, //Shows Top header or not
          tabBarIcon: ({ color }) => (
            <Iconify
              icon={"solar:diagram-up-line-duotone"}
              size={36}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "Profile",
          headerShown: false, //Shows Top header or not
          tabBarIcon: ({ color }) => (
            <Iconify icon={"solar:user-line-duotone"} size={36} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
