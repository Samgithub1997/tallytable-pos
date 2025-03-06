import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function SignUpPageTrial() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [organizationName, setOrganizationName] = React.useState("");
  const [orgRole, setOrgRole] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const showAlert = (message: string) => {
    Alert.alert("Error", message, [{ text: "OK" }]);
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      showAlert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      try {
        const error = JSON.parse(err?.response?.body);
        showAlert(error?.errors?.[0]?.message || "Sign-up failed.");
      } catch {
        console.log("Error in error");
      }
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    const navigation = useNavigation();

    if (!code) {
      showAlert("Please enter the verification code sent to your email.");
      return;
    }

    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        navigation.navigate("restaurant-dashboard"); // Navigate to dashboard after successful verification
      } else {
        showAlert("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      const error = JSON.parse(err?.response?.body);
      showAlert(error?.errors?.[0]?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.description}>
          Enter the verification code sent to {emailAddress}
        </Text>
        <TextInput
          value={code}
          placeholder="Verification Code"
          onChangeText={setCode}
          style={styles.input}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onVerifyPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        onChangeText={setEmailAddress}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        autoCapitalize="none"
        value={organizationName}
        placeholder="Organization"
        onChangeText={setOrganizationName}
        style={styles.input}
      />

      <TextInput
        value={orgRole}
        placeholder="Organization Role"
        onChangeText={setOrgRole}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onSignUpPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
