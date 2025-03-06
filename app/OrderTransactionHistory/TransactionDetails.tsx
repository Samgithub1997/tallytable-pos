import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon, ClipboardIcon } from "react-native-heroicons/outline";
import transactionDetailsDummy from "../../data/dummy/transactionDetailsDummy.json";
import { TransactionDetail } from "@/data/types/transactionDetails";

// Sample data for demonstration
const sampleTransaction: TransactionDetail = transactionDetailsDummy;

const TransactionHistory: React.FC = () => {
  const navigation = useNavigation();

  // Helper function to render a row with label and value.
  const renderDetailRow = (
    label: string,
    value: string | number | undefined
  ) => (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>
        {value !== undefined && value !== "" ? value : "N/A"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.header}
        >
          <ChevronLeftIcon size={24} color="#374151" />
          <Text style={styles.headerTitle}>Transaction Details</Text>
        </TouchableOpacity>

        {/* Basic Transaction Information */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View>
            <View style={styles.iconRow}>
              <ClipboardIcon size={20} color="#3B82F6" />
              <Text style={styles.iconText}>
                Transaction {sampleTransaction.id}
              </Text>
            </View>
            {renderDetailRow("Order ID", sampleTransaction.orderId)}
            {renderDetailRow("Date & Time", sampleTransaction.date)}
            {renderDetailRow(
              "Transaction Type",
              sampleTransaction.transactionType
            )}
            {renderDetailRow("Status", sampleTransaction.status)}
            {renderDetailRow(
              "Authorization Code",
              sampleTransaction.authorizationCode
            )}
          </View>
        </View>

        {/* Financial Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Financial Details</Text>
          {renderDetailRow(
            "Subtotal",
            `$${sampleTransaction.subtotal.toFixed(2)}`
          )}
          {renderDetailRow(
            "Tax Amount",
            `$${sampleTransaction.tax.toFixed(2)}`
          )}
          {renderDetailRow(
            "Tip Amount",
            `$${sampleTransaction.tip.toFixed(2)}`
          )}
          {renderDetailRow(
            "Discounts",
            sampleTransaction.discounts !== undefined
              ? `$${sampleTransaction.discounts.toFixed(2)}`
              : ""
          )}
          {renderDetailRow(
            "Service Charge",
            sampleTransaction.serviceCharge !== undefined
              ? `$${sampleTransaction.serviceCharge.toFixed(2)}`
              : ""
          )}
          {renderDetailRow(
            "Total Amount",
            `$${sampleTransaction.total.toFixed(2)}`
          )}
          {renderDetailRow(
            "Payment Tendered",
            sampleTransaction.paymentTendered !== undefined
              ? `$${sampleTransaction.paymentTendered.toFixed(2)}`
              : ""
          )}
          {renderDetailRow(
            "Change Given",
            sampleTransaction.changeGiven !== undefined
              ? `$${sampleTransaction.changeGiven.toFixed(2)}`
              : ""
          )}
          {renderDetailRow(
            "Transaction Fees",
            sampleTransaction.transactionFees !== undefined
              ? `$${sampleTransaction.transactionFees.toFixed(2)}`
              : ""
          )}
        </View>

        {/* Payment Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          {renderDetailRow("Payment Method", sampleTransaction.paymentMethod)}
          {renderDetailRow("Card Type", sampleTransaction.cardType)}
          {renderDetailRow(
            "Masked Card Number",
            sampleTransaction.maskedCardNumber
          )}
          {renderDetailRow("Terminal ID", sampleTransaction.terminalId)}
          {renderDetailRow(
            "Payment Processor",
            sampleTransaction.paymentProcessor
          )}
          {renderDetailRow("Batch ID", sampleTransaction.batchId)}
          {renderDetailRow("Response Code", sampleTransaction.responseCode)}
        </View>

        {/* Employee & Operational Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Employee & Operational Details
          </Text>
          {renderDetailRow("Cashier", sampleTransaction.cashier)}
          {renderDetailRow(
            "Register/Terminal ID",
            sampleTransaction.registerId
          )}
          {renderDetailRow("Shift Information", sampleTransaction.shiftInfo)}
          {renderDetailRow("Device Info", sampleTransaction.deviceInfo)}
          {renderDetailRow("Location", sampleTransaction.location)}
        </View>

        {/* Order & Customer Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order & Customer Details</Text>
          {renderDetailRow("Order Summary", sampleTransaction.orderSummary)}
          {renderDetailRow("Order Type", sampleTransaction.orderType)}
          {renderDetailRow("Customer Name", sampleTransaction.customerName)}
          {renderDetailRow("Customer Phone", sampleTransaction.customerPhone)}
          {renderDetailRow("Customer Email", sampleTransaction.customerEmail)}
          {renderDetailRow(
            "Delivery Address",
            sampleTransaction.deliveryAddress
          )}
          {renderDetailRow(
            "Loyalty Points Earned",
            sampleTransaction.loyaltyPointsEarned !== undefined
              ? sampleTransaction.loyaltyPointsEarned.toString()
              : ""
          )}
          {renderDetailRow(
            "Loyalty Points Redeemed",
            sampleTransaction.loyaltyPointsRedeemed !== undefined
              ? sampleTransaction.loyaltyPointsRedeemed.toString()
              : ""
          )}
          {renderDetailRow("Gift Card Used", sampleTransaction.giftCardUsed)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    marginLeft: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  label: {
    color: "#6B7280",
    fontWeight: "500",
    width: 150,
  },
  value: {
    color: "#374151",
    flex: 1,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
});
