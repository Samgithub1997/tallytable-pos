import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import tableDummy from "../../data/dummy/TableData.json";

type TableStatus = "Available" | "Occupied" | "Reserved";

type ReservationFor = {
  name: string;
  phone: string;
  email: string;
};

type Table = {
  id: string;
  name: string;
  status: TableStatus;
  capacity: number;
  location: string;
  reservedFor?: ReservationFor;
  reservationDate?: string; // e.g. "08/30/2025"
  reservationTime?: string; // e.g. "14:30" (24-hour)
  waitTime?: string; // in hours
};

const TableManagementHome: React.FC = () => {
  const navigation = useNavigation();

  const [currentTab, setCurrentTab] = useState<TableStatus>("Available");
  const [tables, setTables] = useState<Table[]>(tableDummy);
  const [searchText, setSearchText] = useState("");

  // Modal visibility states
  const [isAddEditTableModalVisible, setAddEditTableModalVisible] =
    useState(false);
  const [isOccupyModalVisible, setOccupyModalVisible] = useState(false);
  const [isReserveModalVisible, setReserveModalVisible] = useState(false);
  const [isChangeTableModalVisible, setChangeTableModalVisible] =
    useState(false);
  // New feedback modal state
  const [isFeedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [actionType, setActionType] = useState<"Add" | "Edit">("Add");

  // Form fields (Add/Edit Table)
  const [tableName, setTableName] = useState("");
  const [tableCapacity, setTableCapacity] = useState("");
  const [tableLocation, setTableLocation] = useState("");
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  // Occupy/Reserve fields
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Reservation date/time text fields
  const [reservationDateText, setReservationDateText] = useState<string>("");
  const [reservationTimeText, setReservationTimeText] = useState<string>("");
  const [waitTime, setWaitTime] = useState<string>("");

  // Change Table field (target table id)
  const [newTableId, setNewTableId] = useState("");

  /**
   * Auto-update table status every minute:
   * - If now >= (reservationTime - 1hr) && < reservationTime => status becomes Reserved (unless Occupied)
   * - If now >= (reservationTime + waitTime) => status reverts to Available
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTables((prevTables) => {
        return prevTables.map((table) => {
          if (table.reservationDate && table.reservationTime) {
            const dt = combineDateTime(
              table.reservationDate,
              table.reservationTime
            );
            if (dt) {
              const now = new Date();
              const reservationMs = dt.getTime();
              const oneHourBefore = reservationMs - 3600000;
              if (
                now.getTime() >= oneHourBefore &&
                now.getTime() < reservationMs &&
                table.status !== "Occupied"
              ) {
                table.status = "Reserved";
              }
              if (table.waitTime && parseFloat(table.waitTime) > 0) {
                const endMs =
                  reservationMs + parseFloat(table.waitTime) * 3600000;
                if (now.getTime() >= endMs && table.status === "Reserved") {
                  table.status = "Available";
                  table.reservedFor = undefined;
                  table.reservationDate = "";
                  table.reservationTime = "";
                  table.waitTime = "0";
                }
              }
            }
          }
          return { ...table };
        });
      });
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  /**
   * Helper to combine "MM/DD/YYYY" and "HH:mm" into a Date object.
   */
  const combineDateTime = (dateStr: string, timeStr: string): Date | null => {
    try {
      const [mm, dd, yyyy] = dateStr.split("/");
      const [HH, MM] = timeStr.split(":");
      if (!mm || !dd || !yyyy || !HH || !MM) return null;
      const year = parseInt(yyyy, 10);
      const month = parseInt(mm, 10) - 1;
      const day = parseInt(dd, 10);
      const hour = parseInt(HH, 10);
      const minute = parseInt(MM, 10);
      if (
        isNaN(year) ||
        isNaN(month) ||
        isNaN(day) ||
        isNaN(hour) ||
        isNaN(minute)
      ) {
        return null;
      }
      return new Date(year, month, day, hour, minute, 0, 0);
    } catch (e) {
      return null;
    }
  };

  /***********************************************
   *              TAB HANDLER
   **********************************************/
  const toggleTab = (tab: TableStatus) => setCurrentTab(tab);

  /***********************************************
   *           ADD / EDIT TABLE / CANCEL RESERVATION
   **********************************************/
  const openAddEditTableModal = (type: "Add" | "Edit", table?: Table) => {
    setActionType(type);
    if (type === "Edit" && table) {
      setSelectedTable(table);
      setTableName(table.name);
      setTableCapacity(table.capacity.toString());
      setTableLocation(table.location);
    } else {
      resetForm();
    }
    setAddEditTableModalVisible(true);
  };

  const handleAddEditTable = () => {
    if (!tableName || !tableCapacity || !tableLocation) {
      showFeedbackModal("Error: Please fill all table fields.");
      return;
    }
    if (actionType === "Edit" && selectedTable) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === selectedTable.id
            ? {
                ...t,
                name: tableName,
                capacity: parseInt(tableCapacity, 10),
                location: tableLocation,
              }
            : t
        )
      );
      setAddEditTableModalVisible(false);
      resetForm();
      showFeedbackModal("Table updated successfully.");
    } else {
      setTables((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          name: tableName,
          status: "Available",
          capacity: parseInt(tableCapacity, 10),
          location: tableLocation,
          reservationDate: "",
          reservationTime: "",
          waitTime: "",
        },
      ]);
      setAddEditTableModalVisible(false);
      resetForm();
      showFeedbackModal("Table added successfully.");
    }
  };

  const handleCancelReservation = (tableId: string) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              status: "Available",
              reservedFor: undefined,
              reservationDate: "",
              reservationTime: "",
              waitTime: "",
            }
          : table
      )
    );
    showFeedbackModal("Reservation cancelled successfully.");
  };

  /***********************************************
   *             OCCUPY TABLE
   **********************************************/
  const openOccupyModal = (table: Table) => {
    setSelectedTable(table);
    setUserName("");
    setUserPhone("");
    setUserEmail("");
    setOccupyModalVisible(true);
  };

  const handleOccupyTable = (tableItem?: Table) => {
    const tId = selectedTable?.id || tableItem?.id;
    if (!tId) return;
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id === tId) {
          return {
            ...table,
            status: "Occupied",
            reservedFor: {
              name: userName || table.reservedFor?.name || "",
              phone: userPhone || table.reservedFor?.phone || "",
              email: userEmail || table.reservedFor?.email || "",
            },
          };
        }
        return table;
      })
    );
    setOccupyModalVisible(false);
    resetForm();
    showFeedbackModal("Table occupied successfully.");
  };

  const placeOrder = (tableItem: Table) => {
    navigation.navigate("place-order", { tableItem });
  };

  /***********************************************
   *            RESERVE TABLE
   **********************************************/
  const openReserveModal = (table: Table) => {
    setSelectedTable(table);
    setUserName("");
    setUserPhone("");
    setUserEmail("");
    setReservationDateText("");
    setReservationTimeText("");
    setWaitTime("");
    setReserveModalVisible(true);
  };

  const handleReserveTable = () => {
    if (!userName || !userPhone || !userEmail) {
      showFeedbackModal("Error: Please fill in name, phone, email.");
      return;
    }
    if (!reservationDateText || !reservationTimeText) {
      showFeedbackModal("Error: Please enter date & time for reservation.");
      return;
    }
    if (!selectedTable) return;
    const newDateObj = combineDateTime(
      reservationDateText,
      reservationTimeText
    );
    if (!newDateObj) {
      showFeedbackModal(
        "Error: Invalid date/time format. Example: 08/30/2025, 14:30 (24h)."
      );
      return;
    }
    if (selectedTable.reservationDate && selectedTable.reservationTime) {
      const oldDateObj = combineDateTime(
        selectedTable.reservationDate,
        selectedTable.reservationTime
      );
      if (oldDateObj) {
        const diffHrs =
          Math.abs(newDateObj.getTime() - oldDateObj.getTime()) /
          (1000 * 60 * 60);
        const sameDay = oldDateObj.toDateString() === newDateObj.toDateString();
        if (sameDay && diffHrs < 3) {
          showFeedbackModal(
            "Conflict: This table already has a reservation close to that time."
          );
          return;
        }
      }
    }
    setTables((prev) =>
      prev.map((t) =>
        t.id === selectedTable.id
          ? {
              ...t,
              status: "Reserved",
              reservedFor: {
                name: userName,
                phone: userPhone,
                email: userEmail,
              },
              reservationDate: reservationDateText,
              reservationTime: reservationTimeText,
              waitTime: waitTime,
            }
          : t
      )
    );
    setReserveModalVisible(false);
    resetForm();
    showFeedbackModal("Table reserved successfully.");
  };

  /***********************************************
   *             CHANGE TABLE LOGIC
   **********************************************/
  const openChangeTableModal = (table: Table) => {
    if (table.status !== "Occupied") {
      showFeedbackModal("Error: Only occupied tables can be changed.");
      return;
    }
    setSelectedTable(table);
    setNewTableId("");
    setChangeTableModalVisible(true);
  };

  const handleChangeTable = () => {
    if (!newTableId) {
      showFeedbackModal("Error: Please enter a new table number.");
      return;
    }
    const targetTable = tables.find((t) => t.id === newTableId);
    if (!targetTable) {
      showFeedbackModal(`Error: Table ${newTableId} does not exist.`);
      return;
    }
    if (targetTable.status !== "Available") {
      showFeedbackModal(
        `Error: Table ${targetTable.name} is not available. It is ${targetTable.status}.`
      );
      return;
    }
    if (!selectedTable) {
      showFeedbackModal("Error: No source table selected.");
      return;
    }
    // Swap: free the source table and occupy the target table with the customer info.
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id === selectedTable.id) {
          return { ...table, status: "Available", reservedFor: undefined };
        } else if (table.id === newTableId) {
          return {
            ...table,
            status: "Occupied",
            reservedFor: selectedTable.reservedFor,
          };
        }
        return table;
      })
    );
    setChangeTableModalVisible(false);
    setNewTableId("");
    setSelectedTable(null);
    showFeedbackModal("Table changed successfully.");
  };

  /***********************************************
   *          RESET FORM
   **********************************************/
  const resetForm = () => {
    setTableName("");
    setTableCapacity("");
    setTableLocation("");
    setUserName("");
    setUserPhone("");
    setUserEmail("");
    setReservationDateText("");
    setReservationTimeText("");
    setWaitTime("");
    setSelectedTable(null);
  };

  /**
   * Opens the feedback modal with a given message.
   */
  const showFeedbackModal = (message: string) => {
    setFeedbackMessage(message);
    setFeedbackModalVisible(true);
  };

  /***********************************************
   *         RENDER TABLE ITEM
   **********************************************/
  const renderTable = ({ item }: { item: Table }) => {
    const getBorderColor = (status: TableStatus) => {
      switch (status) {
        case "Occupied":
          return "#ef4444";
        case "Reserved":
          return "#f59e0b";
        case "Available":
        default:
          return "#10b981";
      }
    };

    return (
      <View
        style={[
          styles.tableContainer,
          { borderLeftColor: getBorderColor(item.status) },
        ]}
      >
        <View style={styles.tableLeft}>
          <Text style={styles.tableTitle}>{item.name}</Text>
          <Text style={styles.tableSubtitle}>
            {item.capacity}-Seater | {item.location}
          </Text>
          {item.reservedFor && (
            <Text style={styles.reservationText}>
              Reserved for: {item.reservedFor.name} ({item.reservedFor.phone})
            </Text>
          )}
          {item.reservationDate ? (
            <Text style={styles.reservationText}>
              Reservation Date: {item.reservationDate}
            </Text>
          ) : null}
          {item.reservationTime ? (
            <Text style={styles.reservationText}>
              Reservation Time: {item.reservationTime}
            </Text>
          ) : null}
          {item?.status === "Reserved" &&
            item.waitTime &&
            parseFloat(item.waitTime) > 0 && (
              <Text style={styles.reservationText}>
                Wait Time: {item.waitTime} hour(s)
              </Text>
            )}
        </View>
        <View style={{ justifyContent: "center" }}>
          {item.status === "Available" && (
            <View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.reserveButton}
                  onPress={() => openReserveModal(item)}
                >
                  <Text style={styles.actionButtonText}>Reserve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.occupyButton}
                  onPress={() => openOccupyModal(item)}
                >
                  <Text style={styles.actionButtonText}>Occupy</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => console.log(item)}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          {item.status === "Reserved" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 8,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.occupyButton}
                  onPress={() => handleOccupyTable(item)}
                >
                  <Text style={styles.actionButtonText}>Occupy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openAddEditTableModal("Edit", item)}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancelReservation(item.id)}
              >
                <Text style={styles.actionButtonText}>Cancel Reservation</Text>
              </TouchableOpacity>
            </View>
          )}
          {item.status === "Occupied" && (
            <View>
              <TouchableOpacity
                style={styles.placeOrderButton}
                onPress={() => placeOrder(item)}
              >
                <Text style={styles.actionButtonText}>Place Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.changeTablesButton}
                onPress={() => openChangeTableModal(item)}
              >
                <Text style={styles.actionButtonText}>Change Tables</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeftIcon size={30} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Table Management</Text>
      </View>
      {/* Search */}
      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon size={20} color="#6b7280" />
        <TextInput
          placeholder="Search for table"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(["Available", "Occupied", "Reserved"] as TableStatus[]).map((tab) => {
          const isActive = currentTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => toggleTab(tab)}
              style={[
                styles.tab,
                isActive ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.activeTabText : styles.inactiveTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Table List */}
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        data={tables
          .filter((t) => t.status === currentTab)
          .filter((t) =>
            t.name.toLowerCase().includes(searchText.toLowerCase())
          )}
        keyExtractor={(item) => item.id}
        renderItem={renderTable}
        ListEmptyComponent={
          <Text
            style={{ textAlign: "center", color: "#6b7280", marginTop: 16 }}
          >
            No tables in this status.
          </Text>
        }
      />
      {/* Floating Add Button */}
      {currentTab === "Available" && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => openAddEditTableModal("Add")}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      )}

      {/****************** ADD/EDIT TABLE MODAL ******************/}
      <Modal
        visible={isAddEditTableModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddEditTableModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {actionType === "Add" ? "Add New Table" : "Edit Table"}
            </Text>
            <TextInput
              placeholder="Table"
              style={styles.modalInput}
              value={tableName}
              onChangeText={setTableName}
            />
            <TextInput
              placeholder="Capacity"
              style={styles.modalInput}
              keyboardType="numeric"
              value={tableCapacity}
              onChangeText={setTableCapacity}
            />
            <TextInput
              placeholder="Location"
              style={styles.modalInput}
              value={tableLocation}
              onChangeText={setTableLocation}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddEditTable}
            >
              <Text style={styles.modalButtonText}>
                {actionType === "Add" ? "Add Table" : "Save Changes"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButtonModal]}
              onPress={() => setAddEditTableModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/****************** RESERVE TABLE MODAL ******************/}
      <Modal
        visible={isReserveModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setReserveModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reserve Table</Text>
            <TextInput
              placeholder="Name"
              style={styles.modalInput}
              value={userName}
              onChangeText={setUserName}
            />
            <TextInput
              placeholder="Phone Number"
              style={styles.modalInput}
              keyboardType="phone-pad"
              value={userPhone}
              onChangeText={setUserPhone}
            />
            <TextInput
              placeholder="Email"
              style={styles.modalInput}
              keyboardType="email-address"
              value={userEmail}
              onChangeText={setUserEmail}
            />
            <TextInput
              placeholder="Date (MM/DD/YYYY)"
              style={styles.modalInput}
              value={reservationDateText}
              onChangeText={setReservationDateText}
            />
            <TextInput
              placeholder="Time (24-hour, e.g. 14:30)"
              style={styles.modalInput}
              value={reservationTimeText}
              onChangeText={setReservationTimeText}
            />
            <TextInput
              placeholder="Wait time (hours)"
              style={styles.modalInput}
              value={waitTime}
              onChangeText={setWaitTime}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleReserveTable}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButtonModal]}
              onPress={() => setReserveModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/****************** OCCUPY TABLE MODAL ******************/}
      <Modal
        visible={isOccupyModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOccupyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Occupy Table</Text>
            <TextInput
              placeholder="Name"
              style={styles.modalInput}
              value={userName}
              onChangeText={setUserName}
            />
            <TextInput
              placeholder="Phone Number"
              style={styles.modalInput}
              keyboardType="phone-pad"
              value={userPhone}
              onChangeText={setUserPhone}
            />
            <TextInput
              placeholder="Email"
              style={styles.modalInput}
              keyboardType="email-address"
              value={userEmail}
              onChangeText={setUserEmail}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleOccupyTable()}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButtonModal]}
              onPress={() => setOccupyModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/****************** CHANGE TABLE MODAL ******************/}
      <Modal
        visible={isChangeTableModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setChangeTableModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Table</Text>
            <Text style={{ marginBottom: 8 }}>
              Current Table: {selectedTable?.name}
            </Text>
            <TextInput
              placeholder="Enter new table number"
              style={styles.modalInput}
              value={newTableId}
              onChangeText={setNewTableId}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleChangeTable}
            >
              <Text style={styles.modalButtonText}>Confirm Change</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButtonModal]}
              onPress={() => setChangeTableModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/****************** FEEDBACK MODAL ******************/}
      <Modal
        visible={isFeedbackModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFeedbackModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Feedback</Text>
            <Text style={{ marginBottom: 16 }}>{feedbackMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setFeedbackModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TableManagementHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    padding: 8,
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#374151",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  activeTab: {
    backgroundColor: "#2563eb",
  },
  inactiveTab: {
    backgroundColor: "#d1d5db",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
  inactiveTabText: {
    color: "#1f2937",
  },
  tableContainer: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    borderLeftWidth: 4,
  },
  tableLeft: {
    flex: 1,
    width: "80%",
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  tableSubtitle: {
    color: "#6b7280",
    fontSize: 14,
  },
  reservationText: {
    marginTop: 4,
    fontSize: 14,
    color: "#374151",
  },
  reserveButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#6366f1",
    borderRadius: 9999,
  },
  occupyButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#2563eb",
    borderRadius: 9999,
  },
  deleteButton: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#f97316",
    borderRadius: 9999,
  },
  editButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#f97316",
    borderRadius: 9999,
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#4f46e5",
    borderRadius: 9999,
  },
  placeOrderButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#2563eb",
    borderRadius: 9999,
    marginBottom: 12,
  },
  changeTablesButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#4f46e5",
    borderRadius: 9999,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  floatingButton: {
    backgroundColor: "#2563eb",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 24,
    right: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 8,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  modalButton: {
    padding: 12,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  cancelButtonModal: {
    backgroundColor: "red",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
