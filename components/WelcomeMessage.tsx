import React from "react";
import { View, Text, FlatList } from "react-native";

const features = [
  "Conducting competitive analysis to understand restaurant industry trends and customer preferences.",
  "Identifying target personas (e.g., diners, delivery customers, corporate clients) and their pain points.",
  "Gathering insights from sales teams, customer reviews, and data analytics to optimize marketing strategies.",
  "Crafting compelling messaging that resonates with different customer segments (e.g., fast-casual vs. fine dining).",
  "Creating and executing product launch plans for new menu items, delivery services, or loyalty programs.",
  "Collaborating with operations, sales, and marketing teams to ensure alignment on campaigns.",
  "Bundling products (e.g., meal deals, seasonal offers) to drive higher order values.",
  "Leading promotional campaigns across multiple channels (email, social media, partnerships).",
  "Enhancing customer loyalty through reward programs, personalized offers, and subscriptions.",
  "Coordinating with technology teams for enhancements in online ordering, delivery apps, and customer experience platforms.",
  "Hiring and training a product marketing team specialized in restaurant marketing.",
  "Ensuring alignment between marketing, sales, and customer service teams.",
];

export default function WelcomeMessage() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        marginTop: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
          padding: 20,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Welcome to Marketing Helper! 👋
        </Text>

        <Text style={{ color: "#666", marginBottom: 10 }}>
          I can help you with:
        </Text>

        <FlatList
          data={features}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 5,
              }}
            >
              <Text style={{ color: "#007AFF", fontSize: 18, marginRight: 5 }}>
                •
              </Text>
              <Text style={{ color: "#444", flexShrink: 1 }}>{item}</Text>
            </View>
          )}
        />

        <Text style={{ color: "#666", marginTop: 15 }}>
          Feel free to ask me anything! I'm here to help.
        </Text>
      </View>
    </View>
  );
}
