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
  MagnifyingGlassIcon,
  FunnelIcon,
  CreditCardIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { ArrowLeft } from "lucide-react-native";

// Transaction Interface
export interface Transaction {
  id: string;
  orderId?: string;
  date: string;
  amount: number;
  paymentMethod: string;
  status: "Success" | "Failed" | "Refunded";
  tip?: number;
  cashier?: string;
}

// Sample Data
const sampleTransactions: Transaction[] = [
  {
    id: "txn001",
    orderId: "order001",
    date: "2025-02-01 12:30 PM",
    amount: 25.5,
    paymentMethod: "Credit Card",
    status: "Success",
    tip: 3.0,
    cashier: "Alice",
  },
  {
    id: "txn002",
    orderId: "order002",
    date: "2025-02-01 12:45 PM",
    amount: 18.0,
    paymentMethod: "Cash",
    status: "Success",
    cashier: "Bob",
  },
  {
    id: "txn003",
    orderId: "order003",
    date: "2025-02-01 01:15 PM",
    amount: 50.0,
    paymentMethod: "Debit Card",
    status: "Refunded",
    cashier: "Carol",
  },
];

const TransactionHistory: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [transactions] = useState<Transaction[]>(sampleTransactions);

  // Filter transactions based on search input
  const filteredTransactions = transactions.filter((txn) => {
    const searchLower = searchText.toLowerCase();
    return (
      txn.id.toLowerCase().includes(searchLower) ||
      (txn.orderId && txn.orderId.toLowerCase().includes(searchLower)) ||
      txn.paymentMethod.toLowerCase().includes(searchLower) ||
      txn.status.toLowerCase().includes(searchLower) ||
      (txn.cashier && txn.cashier.toLowerCase().includes(searchLower))
    );
  });

  // Navigate to Transaction Details
  const getTransactionDetail = (item: Transaction) => {
    console.log("TDetails: ", item);
    navigation.navigate("transaction-details", { item });
  };

  // Render Transaction Card
  const renderTransaction = ({ item }: { item: Transaction }) => {
    // Status Badge Styling
    const statusColors = {
      Success: { bg: "#DCFCE7", text: "#166534" },
      Failed: { bg: "#FEE2E2", text: "#9B2C2C" },
      Refunded: { bg: "#FEF9C3", text: "#B45309" },
    };

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
        onPress={() => getTransactionDetail(item)}
      >
        <View style={{ flex: 1 }}>
          {/* Transaction ID & Status Badge */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CreditCardIcon size={20} color="#3B82F6" />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#1E293B",
                }}
              >
                Transaction {item.id}
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

          {/* Order ID & Date */}
          <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 4 }}>
            Order ID: {item.orderId || "N/A"}
          </Text>
          <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
            {item.date}
          </Text>

          {/* Payment Method */}
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}
          >
            <CreditCardIcon size={16} color="#6B7280" />
            <Text style={{ marginLeft: 6, color: "#6B7280", fontSize: 14 }}>
              {item.paymentMethod}
            </Text>
          </View>

          {/* Amount */}
          <Text
            style={{
              color: "#1E293B",
              fontSize: 18,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            Amount: ${item.amount.toFixed(2)}
          </Text>

          {/* Tip & Cashier */}
          {item.tip !== undefined && (
            <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 4 }}>
              Tip: ${item.tip.toFixed(2)}
            </Text>
          )}
          {item.cashier && (
            <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
              Cashier: {item.cashier}
            </Text>
          )}
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
            Transaction History
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
              outlineStyle: "none",
              color: "#374151",
            }}
            placeholder="Search transactions..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity>
            <FunnelIcon size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 16 }}
      />
    </SafeAreaView>
  );
};

export default TransactionHistory;
