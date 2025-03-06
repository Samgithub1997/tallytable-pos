import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigation = useNavigation();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] =
    React.useState<boolean>(false);
  const [code, setCode] = React.useState("");
  const captchaRef = React.useRef(null);
  const [captchaToken, setCaptchaToken] = React.useState<string>("");
  React.useEffect(() => {
    console.log(pendingVerification);
  }, [captchaToken]);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    console.log(pendingVerification);
    // Start sign-up process using email and password provided
    try {
      const request = {
        phoneNumber: phoneNumber,
        username: username, //scamsham
        emailAddress: emailAddress, //samarthsharma351@gmail.com
        password: password, // SecureParameters!23
      };

      console.log("req: ", request);
      const response = await signUp.create(request);

      console.log("Sign-up response:", response);
      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      console.log("here is the");
      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log("Error signing: ", JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const request = {
        code,
      };
      const signUpAttempt =
        await signUp.attemptEmailAddressVerification(request);
      console.log("Attempt result: ", signUpAttempt);
      // If verification was completed, set the session to active
      // and redirect the user
      navigation.navigate("restaurant-dashboard");
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        navigation.navigate("restaurant-dashboard");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.log("Here :", JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log("Sign attempt failed due to ", err);
    }
  };

  return (
    <>
      {!pendingVerification && (
        <View style={styles.container}>
          <Text style={styles.title}>Sign up</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={username}
            placeholder="Enter Username"
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={phoneNumber}
            placeholder="Enter Phone number"
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          {/* <HCaptcha
          ref={captchaRef}
          sitekey={process.env.EXPO_PUBLIC_CAPTCHA_SITEKEY as string}
          data-sitekey={process.env.EXPO_PUBLIC_CAPTCHA_SITEKEY as string}
          onVerify={setCaptchaToken}
          onError={(error: any) => console.log("Captcha Error:", error)}
        /> */}
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View style={styles.pendingContainer}>
          <View style={styles.headerPending}>
            <ArrowLeftIcon
              size={24}
              onPress={() => setPendingVerification(false)}
            />
            <Text style={styles.title}>Verify your email</Text>
          </View>
          <TextInput
            style={styles.input}
            value={code}
            placeholder="Enter your verification code"
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f3f4f6",
  },
  headerPending: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  pendingContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#1f2937",
  },
  input: {
    marginTop: 8,
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

// export default SignUpPage;
