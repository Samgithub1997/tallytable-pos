import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ClipboardIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronRightIcon,
  CreditCardIcon,
  UserIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import { ArrowLeft, Filter } from "lucide-react-native";

// Order Interfaces
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  tableNumber?: number;
  date: string;
  items: OrderItem[];
  total: number;
  status: "Completed" | "Pending" | "Cancelled";
  orderType: "Eat In" | "Takeaway" | "Delivery";
  paymentMethod?: string;
  customerName?: string;
  serverName?: string;
  deliveryAddress?: string;
}

// Sample Orders
const sampleOrders: Order[] = [
  {
    id: "order001",
    tableNumber: 5,
    date: "2025-02-01 12:30 PM",
    items: [
      { id: "item1", name: "Burger", quantity: 2, price: 8.5 },
      { id: "item2", name: "Fries", quantity: 1, price: 5 },
    ],
    total: 25.5,
    status: "Completed",
    orderType: "Eat In",
    paymentMethod: "Credit Card",
    serverName: "John Doe",
    customerName: "Alice Johnson",
  },
  {
    id: "order002",
    date: "2025-02-01 12:45 PM",
    items: [
      { id: "item3", name: "Pizza", quantity: 1, price: 12 },
      { id: "item4", name: "Salad", quantity: 1, price: 6 },
    ],
    total: 18.0,
    status: "Pending",
    orderType: "Takeaway",
    paymentMethod: "Cash",
    customerName: "Bob Smith",
  },
  {
    id: "order003",
    date: "2025-02-01 01:15 PM",
    items: [
      { id: "item5", name: "Steak", quantity: 1, price: 30 },
      { id: "item6", name: "Wine", quantity: 2, price: 10 },
    ],
    total: 50.0,
    status: "Completed",
    orderType: "Delivery",
    paymentMethod: "Debit Card",
    customerName: "Carol White",
    deliveryAddress: "123 Main St, Springfield",
  },
];

const OrderHistory: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [orders] = useState<Order[]>(sampleOrders);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Filter Orders Based on Search & Status
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchText.toLowerCase();
    const tableSearch = order.tableNumber ? order.tableNumber.toString() : "";
    const matchesSearch =
      order.id.toLowerCase().includes(searchLower) ||
      tableSearch.includes(searchLower) ||
      order.orderType.toLowerCase().includes(searchLower) ||
      (order.paymentMethod &&
        order.paymentMethod.toLowerCase().includes(searchLower)) ||
      (order.serverName &&
        order.serverName.toLowerCase().includes(searchLower)) ||
      (order.customerName &&
        order.customerName.toLowerCase().includes(searchLower)) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchLower));

    const matchesFilter = filterStatus ? order.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  // Navigate to Order Details
  const getOrderDetails = (item: Order) => {
    navigation.navigate("previous-order-details", { item });
  };

  // Order Card UI
  const renderOrder = ({ item }: { item: Order }) => {
    const orderDetails =
      item.orderType === "Eat In" && item.tableNumber
        ? `Eat In • Table ${item.tableNumber}`
        : item.orderType;

    // Status Badge Colors
    const statusColors = {
      Completed: { bg: "#DCFCE7", text: "#166534" },
      Pending: { bg: "#FEF9C3", text: "#B45309" },
      Cancelled: { bg: "#FEE2E2", text: "#9B2C2C" },
    };

    // Ordered Items Summary
    const itemsSummary = item.items
      .map((dish) => `${dish.name} x${dish.quantity}`)
      .join(", ");

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          backgroundColor: "#ffffff",
          padding: 16,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
        onPress={() => getOrderDetails(item)}
      >
        <View style={{ flex: 1 }}>
          {/* Order ID & Status */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ClipboardIcon size={20} color="#3B82F6" />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#1E293B",
                }}
              >
                Order {item.id}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: statusColors[item.status].bg,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: statusColors[item.status].text,
                }}
              >
                {item.status}
              </Text>
            </View>
          </View>

          {/* Order Details */}
          <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 4 }}>
            {item.date}
          </Text>
          <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
            {orderDetails}
          </Text>
          <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
            Customer: {item.customerName || "N/A"}
          </Text>
          <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
            Paid via: {item.paymentMethod || "N/A"}
          </Text>
          <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
            Items: {itemsSummary}
          </Text>

          {/* Total Amount */}
          <Text
            style={{
              color: "#1E293B",
              fontSize: 18,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            Total: ${item.total.toFixed(2)}
          </Text>
        </View>
        <ChevronRightIcon size={24} color="#6B7280" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4F6", padding: 16 }}>
      {/* Header Section */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 20,
          backgroundColor: "#ffffff",
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowLeft size={28} color="#374151" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: "#1E293B",
              marginLeft: 12,
            }}
          >
            Order History
          </Text>
        </View>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F1F5F9",
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginTop: 16,
          }}
        >
          <MagnifyingGlassIcon size={20} color="#6B7280" />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              paddingLeft: 8,
              color: "#374151",
              outlineStyle: "none",
            }}
            placeholder="Search orders..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity>
            <FunnelIcon size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OrderHistory;
