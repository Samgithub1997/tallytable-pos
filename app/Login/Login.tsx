// import { useSignIn } from "@clerk/clerk-expo";
// import { Link, useRouter } from "expo-router";
// import { Text, TextInput, Button, View } from "react-native";
// import React, { useCallback, useState } from "react";
// import { useNavigation } from "@react-navigation/native";

// export default function SignInPage() {
//   const { signIn, setActive, isLoaded } = useSignIn();
//   const router = useRouter();
//   const navigation = useNavigation();

//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");

//   // Handle the submission of the sign-in form
//   const onSignInPress = useCallback(async () => {
//     if (!isLoaded) return;

//     // Start the sign-in process using the email and password provided
//     try {
//       const signInAttempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       });

//       // If sign-in process is complete, set the created session as active
//       // and redirect the user
//       if (signInAttempt.status === "complete") {
//         await setActive({ session: signInAttempt.createdSessionId });
//         router.replace("/");
//       } else {
//         // If the status isn't complete, check why. User might need to
//         // complete further steps.
//         console.error(JSON.stringify(signInAttempt, null, 2));
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   }, [isLoaded, emailAddress, password]);

//   return (
//     <View>
//       <TextInput
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
//       />
//       <TextInput
//         value={password}
//         placeholder="Enter password"
//         secureTextEntry={true}
//         onChangeText={(password) => setPassword(password)}
//       />
//       <Button title="Sign in" onPress={onSignInPress} />
//       <View>
//         <Text>Don't have an account?</Text>

//         <Text onPress={() => navigation.navigate("sign-up")}>Sign up</Text>
//       </View>
//     </View>
//   );
// }

import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import {
  UserCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const Login = () => {
  const navigation = useNavigation();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email, // Ensure 'identifier' is the right field; otherwise, try 'emailAddress'
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error("Sign-in incomplete:", signInAttempt);
      }
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  }, [isLoaded, email, password]);

  return (
    <ImageBackground
      source={require("../../assets/images/LoginBackground.avif")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <UserCircleIcon size={64} color="#2563EB" />
            <Text style={styles.headerText}>Restaurant Login</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeSlashIcon size={24} color="gray" />
                ) : (
                  <EyeIcon size={24} color="gray" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSignInPress} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("sign-up")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  container: {
    flex: 1,
    marginHorizontal: "10%",
    marginTop: "25%",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    color: "#555",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  forgotPasswordButton: {
    marginBottom: 12,
  },
  forgotPasswordText: {
    color: "#2563EB",
    textAlign: "right",
  },
  loginButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  signupText: {
    color: "#555",
  },
  signupLink: {
    color: "#2563EB",
    fontWeight: "bold",
  },
});

export default Login;
