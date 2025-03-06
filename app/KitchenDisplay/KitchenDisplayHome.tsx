import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import {
  ComputerDesktopIcon,
  NewspaperIcon,
} from "react-native-heroicons/outline";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KitchenDisplayMenu from "./KitchenDisplayMenu";
import KitchenDisplayOrders from "./KitchenDisplayOrders";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const KitchenDisplayHome = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Menu") {
            return <ComputerDesktopIcon size={48} color={color} />;
          } else if (route.name === "Orders") {
            return <NewspaperIcon size={48} color={color} />;
          }
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "black",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
        },
      })}
    >
      <Tabs.Screen
        name="Menu"
        component={KitchenDisplayMenu}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="Orders"
        component={KitchenDisplayOrders}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

export default KitchenDisplayHome;
