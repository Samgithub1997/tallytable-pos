import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

const PlaceOrder: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const { tableItem } = route.params;

  const [cart, setCart] = useState<Record<string, any>>({});
  const [searchText, setSearchText] = useState("");

  type Dish = {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    isPopular: boolean;
    image: string;
  };

  type Category = {
    id: string;
    name: string;
    dishes: Dish[];
  };

  type CartItem = {
    quantity: number;
    specialInstructions: string;
  };

  const categories: Category[] = [
    {
      id: "1",
      name: "Gyros Wraps",
      dishes: [
        {
          id: "1",
          name: "Chicken Gyros Wrap",
          description:
            "Freshly shaved chicken gyros wrapped in a Greek pitta with homemade mustard sauce, lettuce, tomatoes, red onions, parsley, and oregano fries.",
          price: 9.31,
          originalPrice: 10.95,
          isPopular: true,
          image:
            "https://greeceinsiders.travel/wp-content/uploads/2022/03/greek-foods_feature-scaled-1920x960-resized-q10.jpg",
        },
        {
          id: "2",
          name: "Pork Gyros Wrap",
          description:
            "Freshly shaved pork gyros wrapped in a Greek pitta with homemade tzatziki, tomatoes, red onions, parsley, and oregano fries.",
          price: 9.31,
          isPopular: true,
          image:
            "https://mandyjackson.com/wp-content/uploads/2022/08/chicken_shawarma_platter.jpg",
        },
      ],
    },
    {
      id: "2",
      name: "Shawarma Wraps",
      dishes: [
        {
          id: "3",
          name: "Chicken Shawarma Wrap",
          description:
            "Freshly shaved chicken gyros wrapped in a Greek pitta with homemade mustard sauce, lettuce, tomatoes, red onions, parsley, and oregano fries.",
          price: 9.31,
          originalPrice: 10.95,
          isPopular: true,
          image:
            "https://greeceinsiders.travel/wp-content/uploads/2022/03/greek-foods_feature-scaled-1920x960-resized-q10.jpg",
        },
        {
          id: "4",
          name: "Pork Gyros Wrap",
          description:
            "Freshly shaved pork gyros wrapped in a Greek pitta with homemade tzatziki, tomatoes, red onions, parsley, and oregano fries.",
          price: 9.31,
          isPopular: true,
          image:
            "https://mandyjackson.com/wp-content/uploads/2022/08/chicken_shawarma_platter.jpg",
        },
        {
          id: "5",
          name: "Beef Shawarma Wrap",
          description:
            "Freshly shaved beef  wrapped in a Greek pitta with homemade mustard sauce, lettuce, tomatoes, red onions, parsley, and oregano fries.",
          price: 9.31,
          originalPrice: 10.95,
          isPopular: true,
          image:
            "https://greeceinsiders.travel/wp-content/uploads/2022/03/greek-foods_feature-scaled-1920x960-resized-q10.jpg",
        },
        {
          id: "6",
          name: "Shawarma Beef Mix Wrap",
          description:
            "Freshly shaved pork gyros wrapped in a Greek pitta with homemade tzatziki, tomatoes, red onions, parsley, and oregano fries.",
          price: 9.31,
          isPopular: true,
          image:
            "https://mandyjackson.com/wp-content/uploads/2022/08/chicken_shawarma_platter.jpg",
        },
      ],
    },
  ];

  const addToCart = (dish: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart[dish.id];
      return {
        ...prevCart,
        [dish.id]: {
          ...dish, // Store full dish details
          quantity: existingItem ? existingItem.quantity + 1 : 1,
          specialInstructions: existingItem?.specialInstructions || "",
        },
      };
    });
  };

  const removeFromCart = (dishId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart[dishId];
      if (!existingItem) return prevCart;

      const newQuantity = existingItem.quantity - 1;
      if (newQuantity <= 0) {
        const updatedCart = { ...prevCart };
        delete updatedCart[dishId];
        return updatedCart;
      }
      return {
        ...prevCart,
        [dishId]: { ...existingItem, quantity: newQuantity },
      };
    });
  };

  const handleSpecialInstructionsChange = (
    dishId: string,
    instructions: string
  ) => {
    setCart((prevCart) => ({
      ...prevCart,
      [dishId]: { ...prevCart[dishId], specialInstructions: instructions },
    }));
  };

  const getCartTotal = () => {
    return Object.values(cart).reduce(
      (total, item: any) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Order for {tableItem?.name}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon size={25} />
        <TextInput
          placeholder="Search for dishes..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Dishes List */}
      <ScrollView>
        {categories?.map((category: any) => (
          <View key={category.id} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            {category.dishes.map((dish: any) => (
              <View key={dish.id} style={styles.dishCard}>
                <Image source={{ uri: dish.image }} style={styles.image} />
                <View style={styles.dishInfo}>
                  <Text style={styles.dishName}>{dish.name}</Text>
                  <Text style={styles.dishDescription}>{dish.description}</Text>
                  <Text style={styles.dishPrice}>£{dish.price.toFixed(2)}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => removeFromCart(dish.id)}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityNumber}>
                    {cart[dish.id]?.quantity || 0}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => addToCart(dish)}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Cart Summary Button */}
      {Object.keys(cart).length > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            navigation.navigate("order-details", {
              cart: Object.values(cart),
              total: getCartTotal(),
            })
          }
        >
          <Text style={styles.cartText}>
            Proceed to Order ({Object.keys(cart).length} items) - £
            {getCartTotal().toFixed(2)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: { padding: 16, backgroundColor: "#22c55e" },
  headerText: { color: "white", fontSize: 20, fontWeight: "bold" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 10,
    margin: 16,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  categoryContainer: { paddingHorizontal: 16, marginBottom: 12 },
  categoryTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  dishCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  dishInfo: { flex: 1, marginLeft: 10 },
  dishName: { fontSize: 16, fontWeight: "bold" },
  dishDescription: { fontSize: 12, color: "#6b7280" },
  dishPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2563eb",
    marginTop: 5,
  },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#2563eb",
    borderRadius: 5,
  },
  quantityText: { color: "white", fontSize: 16, fontWeight: "bold" },
  quantityNumber: { fontSize: 16, fontWeight: "bold", marginHorizontal: 10 },
  cartButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    margin: 16,
  },
  cartText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PlaceOrder;
