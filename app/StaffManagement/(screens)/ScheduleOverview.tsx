import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AutoScheduleScreen from "./(schedules)/AutoScheduleScreen";
import ScheduleAdjustmentsScreen from "./(schedules)/ScheduleAdjustmentsScreen";
import PredictiveDemandScreen from "./(schedules)/PredictiveDemandScreen";
import { SafeAreaView } from "react-native";

import ScheduleOverviewScreen from "./(schedules)/ScheduleOverviewScreen";

const Tab = createBottomTabNavigator();

export default function ScheduleOverview() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            margin: 8,
            paddingVertical: 16,
            borderRadius: 8,
            height: 80, // Increased tab height
            paddingTop: 12,
          },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            switch (route.name) {
              case "Schedule":
                iconName = "calendar";
                break;
              case "AI Auto-Schedule":
                iconName = "robot";
                break;
              case "Adjustments":
                iconName = "tools";
                break;
              case "Predictive Demand":
                iconName = "chart-line-variant"; // "crystal-ball" is not available
                break;
            }

            return (
              <Icon
                name={iconName}
                size={focused ? 32 : 28} // Increased icon size for better visibility
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#3B82F6",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            marginTop: 8,
            fontSize: 12, // Increase label size if needed
            fontWeight: "600",
          },
        })}
      >
        <Tab.Screen name="Schedule" component={ScheduleOverviewScreen} />
        <Tab.Screen name="AI Auto-Schedule" component={AutoScheduleScreen} />
        <Tab.Screen name="Adjustments" component={ScheduleAdjustmentsScreen} />
        <Tab.Screen
          name="Predictive Demand"
          component={PredictiveDemandScreen}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
