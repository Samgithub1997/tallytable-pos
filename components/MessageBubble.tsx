import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useUser } from "@clerk/clerk-expo"; // Clerk for authentication
import { Icon } from "react-native-elements";

interface MessageBubbleProps {
  content: string;
  isUser?: boolean;
}

const formatMessage = (content: string): string => {
  content = content.replace(/\\\\/g, "\\").replace(/\\n/g, "\n");
  content = content.replace(/---START---\n?/g, "").replace(/\n?---END---/g, "");
  return content.trim();
};

export function MessageBubble({ content, isUser }: MessageBubbleProps) {
  const { user } = useUser();

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.botText,
          ]}
        >
          {formatMessage(content)}
        </Text>
      </View>

      {/* Avatar/Icon */}
      <View style={styles.avatarContainer}>
        {isUser ? (
          user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.userAvatarPlaceholder]}>
              <Text style={styles.avatarText}>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </Text>
            </View>
          )
        ) : (
          <View style={[styles.avatar, styles.botAvatar]}>
            <Icon
              name="robot"
              type="material-community"
              color="white"
              size={20}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  botContainer: {
    justifyContent: "flex-start",
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "75%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 0,
  },
  botBubble: {
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: "white",
  },
  botText: {
    color: "#333",
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    marginLeft: 8,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
  userAvatarPlaceholder: {
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  botAvatar: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageBubble;
