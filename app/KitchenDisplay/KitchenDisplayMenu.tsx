import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  PlusCircle,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronRight,
  Search,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

type Ingredient = {
  id: string;
  name: string;
  quantity: string; // e.g., "200g", "1 tbsp"
};

type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: Ingredient[];
};

type DishCategory = {
  id: string;
  name: string;
  isExpanded: boolean;
  dishes: Dish[];
};

type MenuCategory = {
  id: string;
  name: string;
  isExpanded: boolean;
  dishCategories: DishCategory[];
};

const MenuManagement: React.FC = () => {
  const navigation = useNavigation();
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<
    "menuCategory" | "dishCategory" | "dish" | "ingredient"
  >("menuCategory");

  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory | null>(null);
  const [selectedDishCategory, setSelectedDishCategory] =
    useState<DishCategory | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);

  const [inputFields, setInputFields] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  /**********************************************
   *               MODAL HANDLING
   **********************************************/
  const openModal = (
    type: "menuCategory" | "dishCategory" | "dish" | "ingredient",
    menuCategory?: MenuCategory,
    dishCategory?: DishCategory,
    dish?: Dish,
    ingredient?: Ingredient
  ) => {
    setModalType(type);
    setSelectedMenuCategory(menuCategory || null);
    setSelectedDishCategory(dishCategory || null);
    setSelectedDish(dish || null);
    setSelectedIngredient(ingredient || null);

    if (type === "menuCategory" && menuCategory) {
      setInputFields({
        name: menuCategory.name,
        description: "",
        price: "",
        quantity: "",
      });
    } else if (type === "dishCategory" && dishCategory) {
      setInputFields({
        name: dishCategory.name,
        description: "",
        price: "",
        quantity: "",
      });
    } else if (type === "dish" && dish) {
      setInputFields({
        name: dish.name,
        description: dish.description,
        price: dish.price.toString(),
        quantity: "",
      });
    } else if (type === "ingredient" && ingredient) {
      setInputFields({
        name: ingredient.name,
        description: "",
        price: "",
        quantity: ingredient.quantity,
      });
    } else {
      setInputFields({ name: "", description: "", price: "", quantity: "" });
    }

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMenuCategory(null);
    setSelectedDishCategory(null);
    setSelectedDish(null);
    setSelectedIngredient(null);
    setInputFields({ name: "", description: "", price: "", quantity: "" });
  };

  /**********************************************
   *              ADD / EDIT HANDLING
   **********************************************/
  const handleSave = () => {
    const { name, description, price, quantity } = inputFields;

    if (!name.trim()) {
      Alert.alert("Error", "Name field is required.");
      return;
    }

    if (modalType === "menuCategory") {
      if (selectedMenuCategory) {
        // Edit Menu Category
        setMenuCategories((prev) =>
          prev.map((menu) =>
            menu.id === selectedMenuCategory.id ? { ...menu, name } : menu
          )
        );
      } else {
        // Add Menu Category
        setMenuCategories((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            name,
            isExpanded: false,
            dishCategories: [],
          },
        ]);
      }
    } else if (modalType === "dishCategory" && selectedMenuCategory) {
      if (selectedDishCategory) {
        // Edit Dish Category
        setMenuCategories((prev) =>
          prev.map((menu) =>
            menu.id === selectedMenuCategory.id
              ? {
                  ...menu,
                  dishCategories: menu.dishCategories.map((dishCategory) =>
                    dishCategory.id === selectedDishCategory.id
                      ? { ...dishCategory, name }
                      : dishCategory
                  ),
                }
              : menu
          )
        );
      } else {
        // Add Dish Category
        setMenuCategories((prev) =>
          prev.map((menu) =>
            menu.id === selectedMenuCategory.id
              ? {
                  ...menu,
                  dishCategories: [
                    ...menu.dishCategories,
                    {
                      id: Math.random().toString(),
                      name,
                      isExpanded: false,
                      dishes: [],
                    },
                  ],
                }
              : menu
          )
        );
      }
    } else if (
      modalType === "dish" &&
      selectedMenuCategory &&
      selectedDishCategory
    ) {
      if (selectedDish) {
        // Edit Dish
        setMenuCategories((prev) =>
          prev.map((menu) =>
            menu.id === selectedMenuCategory.id
              ? {
                  ...menu,
                  dishCategories: menu.dishCategories.map((dishCategory) =>
                    dishCategory.id === selectedDishCategory.id
                      ? {
                          ...dishCategory,
                          dishes: dishCategory.dishes.map((dish) =>
                            dish.id === selectedDish.id
                              ? {
                                  ...dish,
                                  name,
                                  description,
                                  price: parseFloat(price),
                                }
                              : dish
                          ),
                        }
                      : dishCategory
                  ),
                }
              : menu
          )
        );
      } else {
        // Add Dish
        setMenuCategories((prev) =>
          prev.map((menu) =>
            menu.id === selectedMenuCategory.id
              ? {
                  ...menu,
                  dishCategories: menu.dishCategories.map((dishCategory) =>
                    dishCategory.id === selectedDishCategory.id
                      ? {
                          ...dishCategory,
                          dishes: [
                            ...dishCategory.dishes,
                            {
                              id: Math.random().toString(),
                              name,
                              description,
                              price: parseFloat(price),
                              ingredients: [],
                            },
                          ],
                        }
                      : dishCategory
                  ),
                }
              : menu
          )
        );
      }
    } else if (
      modalType === "ingredient" &&
      selectedMenuCategory &&
      selectedDishCategory &&
      selectedDish
    ) {
      if (selectedIngredient) {
        // Edit Ingredient
        setMenuCategories((prev) =>
          prev.map((menu) =>
            menu.id === selectedMenuCategory.id
              ? {
                  ...menu,
                  dishCategories: menu.dishCategories.map((dishCategory) =>
                    dishCategory.id === selectedDishCategory.id
                      ? {
                          ...dishCategory,
                          dishes: dishCategory.dishes.map((dish) =>
                            dish.id === selectedDish.id
                              ? {
                                  ...dish,
                                  ingredients: dish.ingredients.map(
                                    (ingredient) =>
                                      ingredient.id === selectedIngredient.id
                                        ? { ...ingredient, name, quantity }
                                        : ingredient
                                  ),
                                }
                              : dish
                          ),
                        }
                      : dishCategory
                  ),
                }
              : menu
          )
        );
      } else {
        // Add Ingredient
        setMenuCategories((prev) =>
          prev.map((menu) =>
            menu.id === selectedMenuCategory.id
              ? {
                  ...menu,
                  dishCategories: menu.dishCategories.map((dishCategory) =>
                    dishCategory.id === selectedDishCategory.id
                      ? {
                          ...dishCategory,
                          dishes: dishCategory.dishes.map((dish) =>
                            dish.id === selectedDish.id
                              ? {
                                  ...dish,
                                  ingredients: [
                                    ...dish.ingredients,
                                    {
                                      id: Math.random().toString(),
                                      name,
                                      quantity,
                                    },
                                  ],
                                }
                              : dish
                          ),
                        }
                      : dishCategory
                  ),
                }
              : menu
          )
        );
      }
    }

    closeModal();
  };

  /**********************************************
   *              DELETE HANDLING
   **********************************************/
  const handleDelete = (
    type: "menuCategory" | "dishCategory" | "dish" | "ingredient",
    menuCategoryId?: string,
    dishCategoryId?: string,
    dishId?: string,
    ingredientId?: string
  ) => {
    if (type === "menuCategory" && menuCategoryId) {
      // Delete Menu Category
      setMenuCategories((prev) =>
        prev.filter((menu) => menu.id !== menuCategoryId)
      );
    } else if (type === "dishCategory" && menuCategoryId && dishCategoryId) {
      // Delete Dish Category
      setMenuCategories((prev) =>
        prev.map((menu) =>
          menu.id === menuCategoryId
            ? {
                ...menu,
                dishCategories: menu.dishCategories.filter(
                  (dishCategory) => dishCategory.id !== dishCategoryId
                ),
              }
            : menu
        )
      );
    } else if (type === "dish" && menuCategoryId && dishCategoryId && dishId) {
      // Delete Dish
      setMenuCategories((prev) =>
        prev.map((menu) =>
          menu.id === menuCategoryId
            ? {
                ...menu,
                dishCategories: menu.dishCategories.map((dishCategory) =>
                  dishCategory.id === dishCategoryId
                    ? {
                        ...dishCategory,
                        dishes: dishCategory.dishes.filter(
                          (dish) => dish.id !== dishId
                        ),
                      }
                    : dishCategory
                ),
              }
            : menu
        )
      );
    } else if (
      type === "ingredient" &&
      menuCategoryId &&
      dishCategoryId &&
      dishId &&
      ingredientId
    ) {
      // Delete Ingredient
      setMenuCategories((prev) =>
        prev.map((menu) =>
          menu.id === menuCategoryId
            ? {
                ...menu,
                dishCategories: menu.dishCategories.map((dishCategory) =>
                  dishCategory.id === dishCategoryId
                    ? {
                        ...dishCategory,
                        dishes: dishCategory.dishes.map((dish) =>
                          dish.id === dishId
                            ? {
                                ...dish,
                                ingredients: dish.ingredients.filter(
                                  (ingredient) => ingredient.id !== ingredientId
                                ),
                              }
                            : dish
                        ),
                      }
                    : dishCategory
                ),
              }
            : menu
        )
      );
    }
  };

  /**********************************************
   *              TOGGLE EXPANSION
   **********************************************/
  const filteredMenuCategories = menuCategories.filter(
    (menuCategory) =>
      menuCategory.name.toLowerCase().includes(searchText.toLowerCase()) ||
      menuCategory.dishCategories.some(
        (dishCategory) =>
          dishCategory.name.toLowerCase().includes(searchText.toLowerCase()) ||
          dishCategory.dishes.some(
            (dish) =>
              dish.name.toLowerCase().includes(searchText.toLowerCase()) ||
              dish.ingredients.some((ingredient) =>
                ingredient.name.toLowerCase().includes(searchText.toLowerCase())
              )
          )
      )
  );

  /**********************************************
   *              TOGGLE EXPANSION
   **********************************************/
  const toggleExpand = (
    type: "menuCategory" | "dishCategory",
    menuCategoryId: string,
    dishCategoryId?: string
  ) => {
    if (type === "menuCategory") {
      setMenuCategories((prev) =>
        prev.map((menu) =>
          menu.id === menuCategoryId
            ? { ...menu, isExpanded: !menu.isExpanded }
            : menu
        )
      );
    } else if (type === "dishCategory" && dishCategoryId) {
      setMenuCategories((prev) =>
        prev.map((menu) =>
          menu.id === menuCategoryId
            ? {
                ...menu,
                dishCategories: menu.dishCategories.map((dishCategory) =>
                  dishCategory.id === dishCategoryId
                    ? { ...dishCategory, isExpanded: !dishCategory.isExpanded }
                    : dishCategory
                ),
              }
            : menu
        )
      );
    }
  };

  /**********************************************
   *                 UI RENDERING
   **********************************************/
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeft
          width={24}
          height={24}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Menu Management</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Search width={20} height={20} color="#6b7280" />
        <TextInput
          placeholder="Search menu category, dish, or ingredient"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {filteredMenuCategories.length === 0 ? (
          <Text style={styles.noResults}>No results found.</Text>
        ) : (
          filteredMenuCategories.map((menuCategory) => (
            <View key={menuCategory.id} style={styles.menuCategory}>
              {/* Menu Category */}
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => toggleExpand("menuCategory", menuCategory.id)}
                  style={styles.row}
                >
                  {menuCategory.isExpanded ? (
                    <ChevronDown width={20} height={20} color="black" />
                  ) : (
                    <ChevronRight width={20} height={20} color="black" />
                  )}
                  <Text style={styles.menuCategoryText}>
                    {menuCategory.name}
                  </Text>
                </TouchableOpacity>
                <View style={styles.iconGroup}>
                  <TouchableOpacity
                    onPress={() => openModal("menuCategory", menuCategory)}
                    style={styles.editButton}
                  >
                    <Edit3 width={18} height={18} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete("menuCategory")}
                    style={styles.deleteButton}
                  >
                    <Trash2 width={18} height={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              {menuCategory.isExpanded &&
                menuCategory.dishCategories.map((dishCategory) => (
                  <View key={dishCategory.id} style={styles.dishCategory}>
                    {/* Dish Category */}
                    <View style={styles.row}>
                      <TouchableOpacity
                        onPress={() =>
                          toggleExpand(
                            "dishCategory",
                            menuCategory.id,
                            dishCategory.id
                          )
                        }
                        style={styles.row}
                      >
                        {dishCategory.isExpanded ? (
                          <ChevronDown width={20} height={20} color="black" />
                        ) : (
                          <ChevronRight width={20} height={20} color="black" />
                        )}
                        <Text style={styles.dishCategoryText}>
                          {dishCategory.name}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.iconGroup}>
                        <TouchableOpacity
                          onPress={() =>
                            openModal(
                              "dishCategory",
                              menuCategory,
                              dishCategory
                            )
                          }
                          style={styles.editButton}
                        >
                          <Edit3 width={18} height={18} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDelete("dishCategory")}
                          style={styles.deleteButton}
                        >
                          <Trash2 width={18} height={18} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {dishCategory.isExpanded &&
                      dishCategory.dishes.map((dish) => (
                        <View key={dish.id} style={styles.dish}>
                          {/* Dish */}
                          <View style={styles.row}>
                            <Text style={styles.dishText}>{dish.name}</Text>
                            <View style={styles.iconGroup}>
                              <TouchableOpacity
                                onPress={() =>
                                  openModal(
                                    "dish",
                                    menuCategory,
                                    dishCategory,
                                    dish
                                  )
                                }
                                style={styles.editButton}
                              >
                                <Edit3 width={18} height={18} color="#fff" />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => handleDelete("dish")}
                                style={styles.deleteButton}
                              >
                                <Trash2 width={18} height={18} color="#fff" />
                              </TouchableOpacity>
                            </View>
                          </View>

                          {/* Ingredients */}
                          <View style={styles.ingredients}>
                            {dish.ingredients.map((ingredient) => (
                              <View key={ingredient.id} style={styles.row}>
                                <Text style={styles.ingredientText}>
                                  {ingredient.name} - {ingredient.quantity}
                                </Text>
                                <View style={styles.iconGroup}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      openModal(
                                        "ingredient",
                                        menuCategory,
                                        dishCategory,
                                        dish,
                                        ingredient
                                      )
                                    }
                                    style={styles.editButton}
                                  >
                                    <Edit3
                                      width={14}
                                      height={14}
                                      color="#fff"
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => handleDelete("ingredient")}
                                    style={styles.deleteButton}
                                  >
                                    <Trash2
                                      width={14}
                                      height={14}
                                      color="#fff"
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            ))}
                          </View>

                          <TouchableOpacity
                            onPress={() =>
                              openModal(
                                "ingredient",
                                menuCategory,
                                dishCategory,
                                dish
                              )
                            }
                            style={styles.addButtonSmall}
                          >
                            <Text style={styles.addButtonText}>
                              Add Ingredient
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}

                    <TouchableOpacity
                      onPress={() =>
                        openModal("dish", menuCategory, dishCategory)
                      }
                      style={styles.addButton}
                    >
                      <Text style={styles.addButtonText}>Add Dish</Text>
                    </TouchableOpacity>
                  </View>
                ))}

              <TouchableOpacity
                onPress={() => openModal("dishCategory", menuCategory)}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add Dish Category</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <TouchableOpacity
          onPress={() => openModal("menuCategory")}
          style={styles.addMenuButton}
        >
          <Text style={styles.addMenuText}>Add Menu Category</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {modalType === "menuCategory"
                ? "Menu Category"
                : modalType === "dishCategory"
                  ? "Dish Category"
                  : modalType === "dish"
                    ? "Dish"
                    : "Ingredient"}
            </Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={inputFields.name}
              onChangeText={(text) =>
                setInputFields((prev) => ({ ...prev, name: text }))
              }
            />
            {modalType === "dish" && (
              <>
                <TextInput
                  placeholder="Description"
                  style={styles.input}
                  value={inputFields.description}
                  onChangeText={(text) =>
                    setInputFields((prev) => ({ ...prev, description: text }))
                  }
                />
                <TextInput
                  placeholder="Price"
                  style={styles.input}
                  keyboardType="numeric"
                  value={inputFields.price}
                  onChangeText={(text) =>
                    setInputFields((prev) => ({ ...prev, price: text }))
                  }
                />
              </>
            )}
            {modalType === "ingredient" && (
              <>
                <TextInput
                  placeholder="Ingredient Name"
                  style={styles.input}
                  value={inputFields.name}
                  onChangeText={(text) =>
                    setInputFields((prev) => ({ ...prev, name: text }))
                  }
                />
                <TextInput
                  placeholder="Quantity"
                  style={styles.input}
                  value={inputFields.quantity}
                  onChangeText={(text) =>
                    setInputFields((prev) => ({ ...prev, quantity: text }))
                  }
                />
              </>
            )}
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#2563eb",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
  },
  searchBar: {
    padding: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#374151",
  },
  content: {
    padding: 16,
  },
  noResults: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuCategory: {
    marginBottom: 24,
  },
  menuCategoryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: 8,
  },
  dishCategory: {
    marginTop: 16,
    marginLeft: 16,
  },
  dishCategoryText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 8,
  },
  dish: {
    marginTop: 12,
    marginLeft: 16,
  },
  dishText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4b5563",
  },
  ingredients: {
    marginLeft: 16,
    marginTop: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: "#6b7280",
  },
  iconGroup: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#f59e0b",
    padding: 8,
    borderRadius: 9999,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    padding: 8,
    borderRadius: 9999,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonSmall: {
    marginTop: 8,
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  addMenuButton: {
    marginTop: 16,
    backgroundColor: "#1d4ed8",
    paddingVertical: 12,
    borderRadius: 8,
  },
  addMenuText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 12,
    backgroundColor: "#d1d5db",
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#374151",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default MenuManagement;
