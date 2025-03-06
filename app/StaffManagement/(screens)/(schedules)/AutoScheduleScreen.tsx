import React from "react";
import { Text, View } from "react-native";
import ScheduleHeader from "./ScheduleHeader";

function AutoScheduleScreen() {
  return (
    <View>
      <ScheduleHeader title="Auto Scheduler" />

      <View style={{ margin: 16 }}>
        <Text style={{ fontSize: 24 }}>Auto Scheduler</Text>
      </View>
    </View>
  );
}

export default AutoScheduleScreen;
