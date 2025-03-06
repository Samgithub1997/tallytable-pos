import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { ArrowRight } from "lucide-react-native";

// Feature list with icons
const features = [
  {
    id: "1",
    title: "AI-Powered Smart Scheduling",
    description: "Automate shift schedules using AI and demand forecasting.",
    icon: "📅",
    screen: "schedule-overview",
  },
  {
    id: "2",
    title: "Employee Management & Experience",
    description: "Manage shifts, payroll, and employee performance seamlessly.",
    icon: "👥",
    screen: "employee-dashboard",
  },
  {
    id: "3",
    title: "Compliance & Labor Law Automation",
    description: "Ensure schedules comply with labor laws and regulations.",
    icon: "📜",
    screen: "compliance-overview",
  },
  {
    id: "4",
    title: "Communication Hub",
    description: "Integrated AI chatbot and messaging for smooth coordination.",
    icon: "💬",
    screen: "ai-shift-bot",
  },
  {
    id: "5",
    title: "Effortless Shift Management & Hiring",
    description: "AI-powered shift swaps and on-demand hiring integration.",
    icon: "🔄",
    screen: "shift-swap",
  },
  {
    id: "6",
    title: "Deep Restaurant System Integration",
    description: "Seamless POS, reservation, and payroll system connections.",
    icon: "🍽️",
    screen: "pos-integration",
  },
];

const StaffManagementHome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* HEADER IMAGE WITH BACK BUTTON */}
      <ImageBackground
        source={{
          uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/1b/c0/f3/cactus-club-cafe-coal.jpg?w=900&h=500&s=1",
        }} // Use a relevant restaurant image
        style={styles.headerImage}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Restaurant Staff Management</Text>
      </ImageBackground>

      {/* FEATURE LIST */}
      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
            <ArrowRight />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default StaffManagementHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  headerImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginLeft: -48,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#3B82F6",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef4ff",
    borderRadius: 10,
    marginRight: 20,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
});
