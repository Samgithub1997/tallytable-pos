import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

export default function Loading() {
  // Generate random number between 2 and 6
  const numMessages = Math.floor(Math.random() * 5) + 2;

  return (
    <View style={styles.container}>
      {/* Messages Section */}
      <View style={styles.messagesContainer}>
        {[...Array(numMessages)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.messageWrapper,
              i % 2 === 0 ? styles.messageRight : styles.messageLeft,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                i % 2 === 0
                  ? styles.messageBubbleRight
                  : styles.messageBubbleLeft,
              ]}
            >
              <View style={[styles.messageLine, { width: "90%" }]} />
              <View style={[styles.messageLine, { width: "75%" }]} />
              <View style={[styles.messageLine, { width: "60%" }]} />
            </View>
          </View>
        ))}
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <View style={styles.inputBox} />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "space-between",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageWrapper: {
    flexDirection: "row",
    marginBottom: 12,
  },
  messageRight: {
    justifyContent: "flex-end",
  },
  messageLeft: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 16,
    padding: 12,
    justifyContent: "space-between",
  },
  messageBubbleRight: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderBottomRightRadius: 4,
    alignSelf: "flex-end",
  },
  messageBubbleLeft: {
    backgroundColor: "white",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignSelf: "flex-start",
  },
  messageLine: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e5e7eb",
    marginBottom: 6,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "white",
    padding: 16,
  },
  inputBox: {
    height: 50,
    backgroundColor: "#f3f4f6",
    borderRadius: 25,
    alignSelf: "center",
    width: width * 0.9,
  },
});
