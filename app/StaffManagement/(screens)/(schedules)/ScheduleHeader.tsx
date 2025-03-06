import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

interface HeaderProps {
  title: string;
}

const ScheduleHeader = ({ title }): HeaderProps => {
  return (
    <View
      style={{
        margin: 8,
        padding: 8,
        borderRadius: 8,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        paddingVertical: 16,
      }}
    >
      <ArrowLeft size={24} style={{ marginRight: 6 }} />
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginLeft: 8,
          color: "#1f2937",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default ScheduleHeader;
