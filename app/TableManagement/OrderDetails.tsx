import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "react-native-heroicons/outline";

const OrderDetailsPage: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const { cart, total } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"success" | "failed" | null>(
    null
  );

  const sendOrderToKitchen = () => {
    const isSuccess = Math.random() > 0.5;
    setOrderStatus(isSuccess ? "success" : "failed");
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* 🏷 Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeftIcon size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Summary</Text>
      </View>

      {/* 🍽 Dish List */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.dishCard}>
            <Image source={{ uri: item.image }} style={styles.dishImage} />
            <View style={styles.dishInfo}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishQuantity}>Qty: {item.quantity}</Text>
              <Text style={styles.dishPrice}>£{item.price.toFixed(2)}</Text>
              {item.specialInstructions && (
                <Text style={styles.specialInstructions}>
                  📝 {item.specialInstructions}
                </Text>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in your order.</Text>
        }
      />

      {/* 🧾 Order Summary & Checkout */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>£{total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={sendOrderToKitchen}
        >
          <Text style={styles.orderButtonText}>Send Order to Kitchen</Text>
        </TouchableOpacity>
      </View>

      {/* 🎉 Order Status Modal */}
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {orderStatus === "success" ? (
              <>
                <CheckCircleIcon size={80} color="green" />
                <Text style={styles.modalTitle}>🎉 Order Confirmed!</Text>
                <Text style={styles.modalText}>
                  Your order has been sent to the kitchen.
                </Text>
              </>
            ) : (
              <>
                <XCircleIcon size={80} color="red" />
                <Text style={styles.modalTitle}>❌ Order Failed</Text>
                <Text style={styles.modalText}>
                  Something went wrong. Try again.
                </Text>
              </>
            )}
            <TouchableOpacity
              style={[
                styles.modalButton,
                orderStatus === "success"
                  ? styles.successButton
                  : styles.failedButton,
              ]}
              onPress={() => {
                setModalVisible(false);
                if (orderStatus === "success")
                  navigation.navigate("restaurant-dashboard");
              }}
            >
              <Text style={styles.modalButtonText}>
                {orderStatus === "success" ? "Go to Dashboard" : "Try Again"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#2563eb",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  listContainer: {
    padding: 16,
  },
  dishCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dishImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  dishInfo: {
    flex: 1,
    marginLeft: 12,
  },
  dishName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  dishQuantity: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 4,
  },
  dishPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#10b981",
    marginTop: 2,
  },
  specialInstructions: {
    fontSize: 12,
    color: "#f59e0b",
    fontStyle: "italic",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#6b7280",
    marginTop: 20,
  },
  footer: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
  },
  orderButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  orderButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: "80%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },
  modalText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 6,
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  successButton: {
    backgroundColor: "#10b981",
  },
  failedButton: {
    backgroundColor: "#dc2626",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderDetailsPage;
