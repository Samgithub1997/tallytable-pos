import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Platform } from "react-native";
import RestaurantDashboard from "./Dashboard/RestaurantDashboard";
import Login from "./Login/Login";
import { useEffect } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Link } from "expo-router";
import SignInPage from "./auth/SignIn";
import KitchenDisplayHome from "./KitchenDisplay/KitchenDisplayHome";
import SignUpPage from "./auth/SignUp";
import TableManagement from "./TableManagement/TableManagement";
import PlaceOrder from "./TableManagement/PlaceOrder";
import OrderDetailsPage from "./TableManagement/OrderDetails";
import OrderTransactionHistory from "./OrderTransactionHistory/OrderTransactionHistoryHome";
import TransactionDetails from "./OrderTransactionHistory/TransactionDetails";
import OrderPlacedDetails from "./OrderTransactionHistory/OrderPlacedDetails";
import domtoimage from "dom-to-image";
import StaffManagmentHome from "./StaffManagement/StaffManagmentHome";
import StaffCheckInCheckOut from "./StaffManagement/StaffCheckInCheckOut";
import InventoryManagementHome from "./InventoryManagement/InventoryManagementHome";
import ReportingHome from "./Reporting/ReportingHome";
import MarketingHome from "./Marketing/MarketingHome";
import ScheduleOverview from "./StaffManagement/(screens)/ScheduleOverview";
import EmployeeDashboard from "./StaffManagement/(screens)/EmployeeDashboard";
import ComplianceOverview from "./StaffManagement/(screens)/ComplianceOverview";
import AiShiftBot from "./StaffManagement/(screens)/AiShiftBot";
import PosIntegration from "./StaffManagement/(screens)/PosIntegration";
import ShiftSwap from "./StaffManagement/(screens)/ShiftSwap";

export default function Index() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const { user } = useUser();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="restaurant-dashboard">
        <Stack.Screen
          name="restaurant-dashboard"
          component={RestaurantDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sign-in"
          component={SignInPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sign-up"
          component={SignUpPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="kitchen-display-home"
          component={KitchenDisplayHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="table-management"
          component={TableManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="place-order"
          component={PlaceOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="order-details"
          component={OrderDetailsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="order-transaction-history"
          component={OrderTransactionHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="transaction-details"
          component={TransactionDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="order-placed-details"
          component={OrderPlacedDetails}
          options={{ headerShown: false }}
        />

        {/* Pending */}
        <Stack.Screen
          name="staff-management"
          component={StaffManagmentHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="staff-check-in-out"
          component={StaffCheckInCheckOut}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="inventory-management"
          component={InventoryManagementHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="reporting"
          component={ReportingHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="marketing"
          component={MarketingHome}
          options={{ headerShown: false }}
        />

        {/*  {
    id: "1",
    title: "AI-Powered Smart Scheduling",
    description: "Automate shift schedules using AI and demand forecasting.",
    icon: "📅",
    screen: "",
  },
  {
    id: "2",
    title: "Employee Management & Experience",
    description: "Manage shifts, payroll, and employee performance seamlessly.",
    icon: "👥",
    screen: "",
  },
  {
    id: "3",
    title: "Compliance & Labor Law Automation",
    description: "Ensure schedules comply with labor laws and regulations.",
    icon: "📜",
    screen: "",
  },
  {
    id: "4",
    title: "Communication Hub",
    description: "Integrated AI chatbot and messaging for smooth coordination.",
    icon: "💬",
    screen: "",
  },
  {
    id: "5",
    title: "Effortless Shift Management & Hiring",
    description: "AI-powered shift swaps and on-demand hiring integration.",
    icon: "🔄",
    screen: "",
  },
  {
    id: "6",
    title: "Deep Restaurant System Integration",
    description: "Seamless POS, reservation, and payroll system connections.",
    icon: "🍽️",
    screen: "pos-integration",
  }, */}
        <Stack.Screen
          name="schedule-overview"
          component={ScheduleOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="employee-dashboard"
          component={EmployeeDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="compliance-overview"
          component={ComplianceOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ai-shift-bot"
          component={AiShiftBot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="pos-integration"
          component={PosIntegration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="shift-swap"
          component={ShiftSwap}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {/* </SignedIn> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
