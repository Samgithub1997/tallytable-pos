import React from "react";
import { View, Text, SafeAreaView, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrderHistory from "./OrderHistory";
import TransactionHistory from "./TransactionHistory";
import { ClipboardIcon, CreditCardIcon } from "react-native-heroicons/outline";
import { color } from "react-native-elements/dist/helpers";

const Tabs = createBottomTabNavigator();

const OrderTransactionHistory = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let icon;
            if (route.name === "Orders") {
              icon = <ClipboardIcon size={30} color={color} />;
            } else if (route.name === "Transactions") {
              icon = <CreditCardIcon size={30} color={color} />;
            }

            return (
              <Animated.View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? "#3B82F6" : "#ffffff",
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 20,
                  shadowColor: focused ? "#3B82F6" : "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 6,
                  elevation: focused ? 8 : 3,
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }}
              >
                {icon}
                {focused && (
                  <Text
                    style={{
                      marginLeft: 6,
                      fontSize: 10,
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    {route.name}
                  </Text>
                )}
              </Animated.View>
            );
          },
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#64748B",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            padding: 16,
            paddingTop: 16,
            bottom: 8,
            left: 24,
            right: 24,
            height: 72,
            borderRadius: 35,
            backgroundColor: "#ffffff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            paddingVertical: 8,
          },
        })}
      >
        <Tabs.Screen name="Orders" component={OrderHistory} />
        <Tabs.Screen name="Transactions" component={TransactionHistory} />
      </Tabs.Navigator>
    </SafeAreaView>
  );
};

export default OrderTransactionHistory;
