import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { FAB } from "react-native-paper";
// import { useUserRole } from "../context/UserRoleContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ScheduleHeader from "./ScheduleHeader";

// Sample shift data with assigned dates
const shifts = [
  {
    id: "1",
    date: "2025-03-10",
    time: "2:00 PM - 10:00 PM",
    role: "Bartender",
    employee: "Alice",
    status: "pending",
  },
  {
    id: "2",
    date: "2025-03-10",
    time: "6:00 PM - 2:00 AM",
    role: "Chef",
    employee: "Michael",
    status: "canceled",
  },
  {
    id: "3",
    date: "2025-03-11",
    time: "10:00 AM - 6:00 PM",
    role: "Waiter",
    employee: "John",
    status: "confirmed",
  },
  {
    id: "4",
    date: "2025-03-11",
    time: "2:00 PM - 10:00 PM",
    role: "Bartender",
    employee: "Alice",
    status: "pending",
  },
  {
    id: "5",
    date: "2025-03-12",
    time: "6:00 PM - 2:00 AM",
    role: "Chef",
    employee: "Michael",
    status: "canceled",
  },
  {
    id: "6",
    date: "2025-03-12",
    time: "6:00 PM - 2:00 AM",
    role: "Chef",
    employee: "Michael",
    status: "confirmed",
  },
];

// Color coding for shift statuses
const statusColors = {
  confirmed: "#34D399", // Green
  pending: "#FBBF24", // Yellow
  canceled: "#EF4444", // Red
};

const ScheduleOverviewScreen = () => {
  const role = "manager";
  const [selectedDate, setSelectedDate] = useState("2025-03-10"); // Default to today
  const [showCalendar, setShowCalendar] = useState(false); // Toggle calendar visibility
  const [searchQuery, setSearchQuery] = useState(""); // Search term

  // Filter shifts based on selected date & search query
  const filteredShifts = shifts.filter(
    (shift) =>
      shift.date === selectedDate &&
      (shift.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shift.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleShiftAction = (shift) => {
    if (role === "manager") {
      alert("Manager Actions: Edit, delete, or approve shift swap requests.");
    } else {
      alert("Employee Actions: Request a shift swap.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScheduleHeader title="Schedule Overview" />
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 10 }}>
        {/* Search Bar & Calendar Button (Same Row) */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <TextInput
            style={{
              flex: 1, // Takes full width
              paddingVertical: 12,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              fontSize: 16,
              padding: 8,
              backgroundColor: "#D3D3D3",
              outline: "none",
            }}
            placeholder="Search by Employee or Role..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Calendar Toggle Button */}
          <TouchableOpacity
            onPress={() => setShowCalendar(!showCalendar)}
            style={{
              marginLeft: 10,
              backgroundColor: "#3B82F6",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Icon name="calendar" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Calendar View (Toggled) */}
        {showCalendar && (
          <Calendar
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#3B82F6" },
            }}
            onDayPress={(day) => setSelectedDate(day.dateString)} // Update selected date
            style={{
              marginTop: 10,
              borderRadius: 10,
              elevation: 3,
              backgroundColor: "white",
            }}
          />
        )}

        {/* Shift List - Shows only filtered shifts */}
        {filteredShifts.length > 0 ? (
          <FlatList
            data={filteredShifts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }} // Prevent bottom tab overlap
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 16,
                  borderRadius: 10,
                  marginVertical: 8,
                  backgroundColor: statusColors[item.status],
                }}
                onPress={() => handleShiftAction(item)}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  {item.time}
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>
                  {item.role} - {item.employee}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {item.status.toUpperCase()}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 16,
              color: "gray",
            }}
          >
            No shifts found.
          </Text>
        )}

        {/* Floating Action Button (FAB) Positioned Above Tabs */}
        {role === "manager" && (
          <FAB
            style={{
              position: "absolute",
              right: 20,
              bottom: 100, // Positioned above the bottom tabs
              backgroundColor: "#3B82F6",
            }}
            icon="plus"
            onPress={() => alert("Add Shift: Manager can add a new shift.")}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScheduleOverviewScreen;
