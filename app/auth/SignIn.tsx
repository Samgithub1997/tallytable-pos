import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View } from "react-native";
import { useState } from "react";
import { useLocalCredentials } from "@clerk/clerk-expo/local-credentials";
import { useNavigation } from "@react-navigation/native";

export default function Page() {
  const navigation = useNavigation();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { hasCredentials, setCredentials, authenticate, biometricType } =
    useLocalCredentials();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async (useLocal: boolean) => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt =
        hasCredentials && useLocal
          ? await authenticate()
          : await signIn.create({
              identifier: emailAddress,
              password,
            });

      // If sign-in process is complete,
      // set the created session as active and redirect the user
      if (signInAttempt.status === "complete") {
        console.log("status is complete?", signInAttempt.status);

        if (!useLocal) {
          await setCredentials({
            identifier: emailAddress,
            password,
          });
        }

        await setActive({ session: signInAttempt.createdSessionId });
        navigation.navigate("restaurant-dashboard");
      } else {
        // If the status is not complete, check why.
        // User may need to complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // For info on error handing,
      // see https://clerk.com/docs/custom-flows/error-handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress: string) => setEmailAddress(emailAddress)}
      />

      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password: string) => setPassword(password)}
      />

      <Button title="Sign In" onPress={() => onSignInPress(false)} />

      {hasCredentials && biometricType && (
        <Button
          title={
            biometricType === "face-recognition"
              ? "Sign in with Face ID"
              : "Sign in with Touch ID"
          }
          onPress={() => onSignInPress(true)}
        />
      )}

      <View>
        <Text>Don't have an account?</Text>

        <Text onPress={() => navigation.navigate("sign-up")}>Sign up</Text>
      </View>
    </View>
  );
}
