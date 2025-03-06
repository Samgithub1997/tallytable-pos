import React, { useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState("");
  const [inputHeight, setInputHeight] = useState(50); // Initial height

  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput("");
    setInputHeight(50); // Reset input height after sending
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            { height: Math.min(inputHeight, 200) }, // Limit max height to 200px
          ]}
          placeholder="Message AI Agent..."
          value={input}
          onChangeText={setInput}
          editable={!isLoading}
          multiline
          textAlignVertical="top" // Ensures text starts at the top
          onContentSizeChange={(event) =>
            setInputHeight(Math.max(50, event.nativeEvent.contentSize.height))
          } // Adjust input height dynamically
        />

        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={isLoading || !input.trim()}
          style={[
            styles.sendButton,
            input.trim() ? styles.sendButtonActive : styles.sendButtonDisabled,
          ]}
        >
          <Icon name="send" type="feather" color="white" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    minHeight: 50,
    maxHeight: 200,
    textAlignVertical: "top",
    borderWidth: 0, // Removes default border
    outlineStyle: "none", // Removes focus outline on Web
    shadowColor: "transparent", // Prevents focus shadow on iOS & Android
    elevation: 0, // Removes focus elevation on Android
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonActive: {
    backgroundColor: "#007AFF",
  },
  sendButtonDisabled: {
    backgroundColor: "#D1D1D1",
  },
});

export default ChatInput;
