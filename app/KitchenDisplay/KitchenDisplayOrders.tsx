import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import kds from "../../data/dummy/kds.json";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

type OrderItem = {
  id: string;
  name: string;
  specialInstructions?: string;
  station: "Grill" | "Salad" | "Fryer" | "Dessert";
  status: "new" | "in-progress" | "done";
};

type Order = {
  id: string;
  timestamp: number;
  items: OrderItem[];
  isVIP?: boolean;
  isRush?: boolean;
};

const KitchenDisplay: React.FC = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState(kds);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    isVIP: false,
    isRush: false,
  });

  // Simulate real-time updates (new orders every 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const newOrder: Order = {
        id: Math.random().toString(),
        timestamp: Date.now(),
        isVIP: Math.random() > 0.8,
        isRush: Math.random() > 0.8,
        items: [
          {
            id: Math.random().toString(),
            name: "Grilled Chicken Burger",
            specialInstructions: "No onions, extra mayo",
            station: "Grill",
            status: "new",
          },
          {
            id: Math.random().toString(),
            name: "Caesar Salad",
            specialInstructions: "No croutons",
            station: "Salad",
            status: "new",
          },
        ],
      };

      setOrders((prev: any) =>
        [...prev, newOrder].sort((a, b) => a.timestamp - b.timestamp)
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Mark an order as in-progress or done
  const updateOrderStatus = (
    orderId: string,
    itemId: string,
    newStatus: "in-progress" | "done"
  ) => {
    setOrders((prevOrders: any) =>
      prevOrders.map((order: any) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item: any) =>
                item.id === itemId ? { ...item, status: newStatus } : item
              ),
            }
          : order
      )
    );
  };

  // Bump (complete) an entire order
  const bumpOrder = (orderId: string) => {
    setOrders((prevOrders: any) =>
      prevOrders.filter((order: any) => order.id !== orderId)
    );
  };

  // Timer alerts (show elapsed time)
  const getTimeElapsed = (timestamp: number) => {
    const elapsedSeconds = Math.floor((Date.now() - timestamp) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  // Filtered and searched orders
  const filteredOrders = orders.filter((order: any) => {
    // Search logic: match id, name, or station
    const matchesSearch =
      order.id.toLowerCase().includes(searchText.toLowerCase()) ||
      order.items.some((item: any) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      ) ||
      order.items.some((item: any) =>
        item.station.toLowerCase().includes(searchText.toLowerCase())
      );

    // Filter logic: match status, isVIP, or isRush
    const matchesStatus =
      !filters.status ||
      order.items.some((item: any) => item.status === filters.status);

    const matchesVIP = !filters.isVIP || order.isVIP;
    const matchesRush = !filters.isRush || order.isRush;

    return matchesSearch && matchesStatus && matchesVIP && matchesRush;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <ArrowLeft
            width={24}
            height={24}
            color="white"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Kitchen Display</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Real-time updates, station routing, and ticket management.
        </Text>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by ID, Name, or Station"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
        <ScrollView
          horizontal
          style={styles.filterScroll}
          showsHorizontalScrollIndicator={false}
        >
          {["new", "in-progress", "done"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                filters.status === status && styles.activeStatusFilter,
              ]}
              onPress={() =>
                setFilters((prev) => ({
                  ...prev,
                  status: prev.status === status ? "" : status,
                }))
              }
            >
              <Text
                style={[
                  styles.filterText,
                  filters.status === status && styles.activeFilterText,
                ]}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.filterButton, filters.isVIP && styles.vipFilter]}
            onPress={() =>
              setFilters((prev) => ({ ...prev, isVIP: !prev.isVIP }))
            }
          >
            <Text
              style={[
                styles.filterText,
                filters.isVIP && styles.activeFilterText,
              ]}
            >
              VIP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, filters.isRush && styles.rushFilter]}
            onPress={() =>
              setFilters((prev) => ({ ...prev, isRush: !prev.isRush }))
            }
          >
            <Text
              style={[
                styles.filterText,
                filters.isRush && styles.activeFilterText,
              ]}
            >
              Rush
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Orders */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderList}
        renderItem={({ item }) => (
          <View style={[styles.orderCard, item.isVIP && styles.vipBorder]}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderTitle}>
                Order #{item.id.slice(5).toUpperCase()}
              </Text>
              <Text style={styles.orderTime}>
                {getTimeElapsed(item.timestamp)}
              </Text>
            </View>

            <View style={styles.priorityTags}>
              {item.isRush && <Text style={styles.rushTag}>Rush</Text>}
              {item.isVIP && <Text style={styles.vipTag}>VIP</Text>}
            </View>

            {item.items.map((orderItem) => (
              <View key={orderItem.id} style={styles.orderItem}>
                <View style={styles.itemRow}>
                  <Text
                    style={[
                      styles.itemName,
                      orderItem.status === "done" && styles.itemDone,
                    ]}
                  >
                    {orderItem.name}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      orderItem.status === "new"
                        ? styles.statusNew
                        : orderItem.status === "in-progress"
                          ? styles.statusInProgress
                          : styles.statusDone,
                    ]}
                    onPress={() =>
                      updateOrderStatus(
                        item.id,
                        orderItem.id,
                        orderItem.status === "new" ? "in-progress" : "done"
                      )
                    }
                  >
                    <Text style={styles.statusButtonText}>
                      {orderItem.status === "new"
                        ? "Start"
                        : orderItem.status === "in-progress"
                          ? "Complete"
                          : "Done"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {orderItem.specialInstructions && (
                  <Text style={styles.specialInstructions}>
                    Special: {orderItem.specialInstructions}
                  </Text>
                )}
              </View>
            ))}

            <TouchableOpacity
              style={styles.bumpButton}
              onPress={() => bumpOrder(item.id)}
            >
              <Text style={styles.bumpButtonText}>Bump Order</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No orders match your search or filters.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    backgroundColor: "#2563eb",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    marginRight: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
  },
  searchContainer: {
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    color: "#374151",
  },
  filterScroll: {
    flexDirection: "row",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: "#d1d5db",
    marginRight: 8,
  },
  activeStatusFilter: {
    backgroundColor: "#2563eb",
  },
  vipFilter: {
    backgroundColor: "#f59e0b",
  },
  rushFilter: {
    backgroundColor: "#ef4444",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  activeFilterText: {
    color: "#fff",
  },
  orderList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  vipBorder: {
    borderColor: "#f59e0b",
    borderWidth: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  orderTime: {
    fontSize: 12,
    color: "#6b7280",
  },
  priorityTags: {
    flexDirection: "row",
    marginBottom: 8,
  },
  rushTag: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    marginRight: 4,
  },
  vipTag: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#b45309",
    backgroundColor: "#fef3c7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  orderItem: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    color: "#1f2937",
  },
  itemDone: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  statusNew: {
    backgroundColor: "#10b981",
  },
  statusInProgress: {
    backgroundColor: "#f59e0b",
  },
  statusDone: {
    backgroundColor: "#9ca3af",
  },
  statusButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  specialInstructions: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  bumpButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  bumpButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 40,
  },
});
export default KitchenDisplay;
