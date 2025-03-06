// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
//   useWindowDimensions,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useAuth, SignedIn, SignedOut, useSignIn } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";

// const features = [
//   { title: "Fast", description: "Quick order processing and updates" },
//   { title: "Modern", description: "Track reservations and table status" },
//   { title: "Smart", description: "AI-driven menu recommendations" },
// ];

// const LandingPage = () => {
//   const navigation = useNavigation();
//   const { isSignedIn } = useAuth();
//   const { width } = useWindowDimensions();

//   const isLargeScreen = width > 400;

//   const handleSignIn = async () => {
//     try {
//       // const loginDetails = await signIn();
//       // console.log(loginDetails);
//       navigation.navigate("login", {});
//     } catch (error) {
//       console.error("Sign in failed:", error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Background Pattern */}
//       <View style={styles.backgroundPattern} />

//       <View style={styles.heroContainer}>
//         <Text style={styles.title}>Restaurant Login</Text>
//         <Text style={styles.subtitle}>
//           Access your tools for managing orders, reservations, menus, and
//           inventory seamlessly.
//         </Text>
//       </View>

//       {/* CTA Buttons */}
//       <View
//         style={[
//           isLargeScreen
//             ? styles.buttonContainerHorizontal
//             : styles.buttonContainer,
//         ]}
//       >
//         <SignedIn>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate("restarant-dashboard")}
//           >
//             <Text style={styles.buttonText}>Get Started</Text>
//             <Ionicons
//               name="arrow-forward"
//               size={20}
//               color="white"
//               style={styles.icon}
//             />
//           </TouchableOpacity>
//         </SignedIn>

//         <SignedOut>
//           <View
//             style={[
//               isLargeScreen ? styles.authButtonsHorizontal : styles.authButtons,
//             ]}
//           >
//             <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//               <Text style={styles.buttonText}>Sign In</Text>
//               <Ionicons
//                 name="arrow-forward"
//                 size={20}
//                 color="white"
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => navigation.navigate("sign-up")}
//             >
//               <Text style={styles.buttonText}>Sign Up</Text>
//               <Ionicons
//                 name="arrow-forward"
//                 size={20}
//                 color="white"
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//           </View>
//         </SignedOut>
//       </View>

//       {/* Features Grid */}
//       <FlatList
//         data={features}
//         key={isLargeScreen ? "large" : "small"}
//         keyExtractor={(item) => item.title}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               isLargeScreen ? styles.featureCardHorizontal : styles.featureCard,
//             ]}
//           >
//             <Text style={styles.featureTitle}>{item.title}</Text>
//             <Text style={styles.featureDescription}>{item.description}</Text>
//           </View>
//         )}
//         numColumns={isLargeScreen ? 3 : 1}
//         contentContainerStyle={styles.featuresContainer}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9fafb",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   backgroundPattern: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#ffffff",
//     backgroundSize: "6rem 4rem",
//     opacity: 0.5,
//   },
//   heroContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#1f2937",
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#4b5563",
//     textAlign: "center",
//     marginTop: 10,
//   },
//   buttonContainer: {
//     alignItems: "center",
//   },
//   buttonContainerHorizontal: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   authButtons: {
//     alignItems: "center",
//   },
//   authButtonsHorizontal: {
//     flexDirection: "row",
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1f2937",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 50,
//     marginTop: 20,
//     marginHorizontal: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   icon: {
//     marginLeft: 10,
//   },
//   featuresContainer: {
//     marginTop: 30,
//     paddingBottom: 20,
//   },
//   featureCard: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 15,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   featureCardHorizontal: {
//     marginHorizontal: 10,
//     flex: 1,
//   },
//   featureTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1f2937",
//   },
//   featureDescription: {
//     fontSize: 14,
//     color: "#4b5563",
//     // textAlign: "center",
//     marginTop: 4,
//   },
// });

// export default LandingPage;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { CloudLightningIcon } from "lucide-react-native";
import { BanknotesIcon, LightBulbIcon } from "react-native-heroicons/outline";

const features = [
  {
    title: "Fast",
    description: "Quick order processing and updates",
    icon: <CloudLightningIcon size={48} />,
  },
  {
    title: "Modern",
    description: "Track reservations and table status",
    icon: <BanknotesIcon size={48} />,
  },
  {
    title: "Smart",
    description: "AI-driven menu recommendations",
    icon: <LightBulbIcon size={48} />,
  },
];

const LandingPage = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { isSignedIn } = useAuth();

  const handleSignIn = async () => {
    try {
      navigation.navigate("login", {});
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern} />

      {/* Card Container */}
      <View style={styles.card}>
        <View style={styles.heroContainer}>
          <Text style={styles.title}>Restaurant Login</Text>
          <Text style={styles.subtitle}>
            Access your tools for managing orders, reservations, menus, and
            inventory seamlessly.
          </Text>
        </View>

        {/* CTA Buttons */}
        <View
          style={[
            width > 300
              ? styles.buttonContainerHorizontal
              : styles.buttonContainer,
          ]}
        >
          <SignedIn>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("restaurant-dashboard")}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
          </SignedIn>

          <SignedOut>
            <View
              style={[
                width > 300 ? styles.authButtonsHorizontal : styles.authButtons,
              ]}
            >
              <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("sign-up")}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color="white"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </SignedOut>
        </View>

        {/* Features Grid */}
        <View
          style={[
            styles.featuresContainer,
            { flexDirection: width > 300 ? "row" : "column" },
          ]}
        >
          {features.map((item, index) => (
            <View
              key={index}
              style={[
                styles.card,
                {
                  // width: width > 300 ? "140%" : "120%",  30% width on large screens, full width on mobile
                  flexDirection: "row",
                },
              ]}
            >
              <View>{item?.icon}</View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDescription}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff",
    opacity: 0.2,
  },
  heroContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonContainerHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 16,
  },
  authButtons: {
    alignItems: "center",
  },
  authButtonsHorizontal: {
    flexDirection: "row",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  icon: {
    marginLeft: 10,
  },
  featuresContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 32,
    borderRadius: 12,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  cardLarge: {
    width: "120%",
  },
  cardSmall: {
    width: "120%",
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  featureContent: {
    marginLeft: 32,
  },
  featureDescription: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
  },
});

export default LandingPage;
