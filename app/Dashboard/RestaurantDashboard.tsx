import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import {
  LayoutGridIcon,
  UsersIcon,
  CalendarIcon,
  ReceiptIcon,
  PackageIcon,
  BarChartIcon,
  ClipboardListIcon,
  TicketCheckIcon,
} from "lucide-react-native";
import { useNavigation } from "expo-router";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import LandingPage from "../Login/LandingPage";
import { FaceSmileIcon } from "react-native-heroicons/outline";
import { useAuth } from "@clerk/clerk-expo";

const RestaurantDashboard = () => {
  const navigation = useNavigation();
  const user: any = useUser();
  console.log("The user: ", user);

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const dashboardTiles = [
    {
      icon: <LayoutGridIcon size={32} color="#3B82F6" />,
      title: "Table Management",
      description:
        "Manage your floor layout, seating arrangements, and track customer reservations in real-time",
      pageName: "table-management",
    },
    {
      icon: <PackageIcon size={32} color="#10B981" />,
      title: "Kitchen Display",
      description:
        "Streamline kitchen operations with real-time order display and tracking for efficient food preparation",
      pageName: "kitchen-display-home",
    },
    {
      icon: <ReceiptIcon size={32} color="#8B5CF6" />,
      title: "Order & Transaction History",
      description:
        "Take order, split billing, process payments securely, and manage transactions effortlessly across all channels",
      pageName: "order-transaction-history",
    },
    {
      icon: <UsersIcon size={32} color="#14B8A6" />,
      title: "Staff Management",
      description:
        "Create staff schedules, track work hours, and manage performance to ensure smooth operations and staffing efficiency",
      pageName: "staff-management",
    },
    {
      icon: <UsersIcon size={32} color="#14B8A6" />,
      title: "Staff Check In/ Check Out",
      description:
        "Create staff schedules, track work hours, and manage performance to ensure smooth operations and staffing efficiency",
      pageName: "staff-management",
    },
    {
      icon: <BarChartIcon size={32} color="#EF4444" />,
      title: "Reporting",
      description:
        "Get detailed reports on sales performance, key metrics, and financial health to make informed business decisions.",
      pageName: "reporting",
    },
    {
      icon: <ClipboardListIcon size={32} color="#6366F1" />,
      title: "Inventory Management",
      description:
        "Monitor inventory levels, track stock movement, and ensure timely restocking to maintain smooth operations.",
      pageName: "inventory-management",
    },
    {
      icon: <TicketCheckIcon size={32} color="#6366F1" />,
      title: "Marketing",
      description: "Add discounts and provide offers to customers",
      pageName: "offer-discounts",
    },
    {
      icon: <FaceSmileIcon size={32} color="#6366F1" />,
      title: "Marketing Manager Bot",
      description:
        "Ask insights on your data and he will tell you what you can do",
      pageName: "marketing-manager-dashboard",
    },
  ];

  return (
    <ScrollView>
      {/* If the user is not signed In, send him to the landing page */}

      <SignedOut>
        <View style={styles.landingContainer}>
          <LandingPage />
        </View>
      </SignedOut>

      {/* If the user is signed in then send him to the restaurant dashboard */}
      <SignedIn>
        {/* <Text>Hello {user?.emailAddresses[0]?.emailAddress}</Text> */}
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/1b/c0/f3/cactus-club-cafe-coal.jpg?w=900&h=500&s=1",
              }}
              style={styles.image}
            />
            <Text style={styles.dashboardTitle}>Cactus Club Dashboard</Text>
          </View>

          {dashboardTiles &&
            dashboardTiles.map((tile: any, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tile}
                onPress={() => {
                  console.log(tile?.pageName);
                  navigation.navigate(tile?.pageName, {});
                }}
              >
                <View style={styles.tileContent}>
                  <View style={styles.iconContainer}>{tile.icon}</View>
                  <View style={styles.textContainer}>
                    <Text style={styles.tileTitle}>{tile.title}</Text>
                    <Text style={styles.tileDescription}>
                      {tile.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </SignedIn>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 16,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 224,
    backgroundColor: "#D1D5DB",
    padding: 16,
  },
  landingContainer: {
    padding: 8,
  },
  dashboardTitle: {
    position: "absolute",
    left: 16,
    top: 180,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  tile: {
    marginTop: 8,
    marginHorizontal: "5%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tileContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginHorizontal: 16,
  },
  textContainer: {
    flex: 1,
    marginBottom: 8,
  },
  tileTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
  },
  tileDescription: {
    color: "#6B7280",
    marginTop: 4,
  },
});

export default RestaurantDashboard;
