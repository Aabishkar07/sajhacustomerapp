import { AuthContext } from "@/context/context";
import {
  addQuantity,
  clearCart,
  clearSingle,
  getCart,
  subQuantity,
} from "@/context/func";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-easy-toast";
import Header from "../layouts/Header";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cart = () => {
  const toastRef = React.createRef();
  const [hasEmail, setHasEmail] = useState(false);
  const products = [
    {
      id: 1,
      image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio14.jpg",
      title:
        "Luxury Black Matte Paint Custom Laser Logo Square Wooden Gift Box Watch Men for your Luxury Brand Heren Horloge",
      price: 11328,
      quantity: 1,
    },
    {
      id: 2,
      image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio20.jpg",
      title:
        "Iron Handle 60 90 Sheets Clothes Pet Dog Cat Hair Adhesive Sticky Lint. Storage Welded Nesting Metal Foldable Logistics Steel Wire Mesh",
      price: 5411,
      quantity: 5,
    },
    {
      id: 3,
      image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio19.jpg",
      title:
        "2022 Europe And America Hot Sell Stainless Steel Hot Sell Spoon Gift Coffee Stir Spoon Gold-plated Dessert Spoon",
      price: 21345,
      quantity: 3,
    },
    {
      id: 4,
      image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio15.jpg",
      title:
        "3150A Withdrawable Type Indoor AC High Voltage Vacuum Circuit Breaker High Quality With Professional Manufacturer",
      price: 27351,
      quantity: 4,
    },
  ];
  const [cartItems, setCartItems] = useState([]);
  const auth = useContext(AuthContext);

  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const shippingFee = 0;
  const tax = 0;
  const total = subtotal + shippingFee + tax;

  const clearData = (item) => {
    clearSingle(item.id);
    auth.loadCart();
    // toastRef.current.show("Removed item from cart successfully", 3000);
  };

  const addCartQuantity = (item) => {
    addQuantity(item.id);
    auth.loadCart();
    // toastRef.current.show("Removed item from cart successfully", 3000);
  };

  const subCartQuantity = (item) => {
    subQuantity(item.id);
    auth.loadCart();
    // toastRef.current.show("Removed item from cart successfully", 3000);
  };

  const clearAll = () => {
    clearCart();
    auth.loadCart();
    // toastRef.current.show("Removed item from cart successfully", 3000);
  };

  useEffect(() => {
    loadCartItems();
  }, [auth]); // Now listening for changes in auth, not cartItems

  const loadCartItems = async () => {
    const cart = await getCart();
    setCartItems(cart);
  };


  useEffect(() => {
    const checkToken = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");

        console.log(email, "email");
        if (email) {
          setHasEmail(true);
        }
      } catch (error) {
        console.error("Failed to fetch the email from AsyncStorage", error);
      }
    };
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cartItems.length != 0 && (
          <Pressable
            className="flex-row justify-end my-4"
            onPress={() => clearAll()}
          >
            {/* fe6700 */}
            <Text className="text-white rounded text-sm bg-[#0066ff] p-1 m-1">
              Clear All
            </Text>
          </Pressable>
        )}

        {cartItems.length === 0 ? (
          <>
            <View className="px-5 py-10">
              <Text className="text-[#fe6700] text-center text-lg">
                Your cart is empty
              </Text>
              <TouchableOpacity
                className="bg-[#0066ff] mt-4 rounded-md p-2"
                onPress={() => router.push("/homepage")}
              >
                <Text className="text-center text-white text-md">
                  Continue Shopping
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <View key={index}>
                <View
                  style={styles.cartItem}
                  className="relative flex-row items-center"
                >
                  <Image
                    source={{ uri: item.image_url }}
                    className="w-20 h-full"
                    style={{ resizeMode: "contain" }}
                  />
                  <View className=" w-[70%] ">
                    <View className="">
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <Text className="">
                        {item.variation &&
                          Object.values(item.variation).map((value, index) => (
                            <View key={index}>
                              <Text className="px-1 text-xs py-1 mr-1.5 text-white bg-red-500 rounded">
                                {value.name}
                              </Text>
                            </View>
                          ))}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between ">
                      <Text>Rs. {item.price}</Text>
                      {item.is_wholesale === 0 ? (
                        <View className="flex-row items-center border rounded-lg w-[30%] justify-between">
                          <Pressable
                            className={`border-r ${
                              item.quantity === 1 ? "opacity-50" : ""
                            }`}
                            onPress={() => subCartQuantity(item)}
                            disabled={item.quantity === 1} // Optionally disable button if quantity is 1
                          >
                            <Icons name="minus" size={20} />
                          </Pressable>
                          <Text className="text-lg">{item.quantity}</Text>
                          <Pressable
                            className="border-l"
                            onPress={() => addCartQuantity(item)}
                          >
                            <Icons name="plus" size={20} />
                          </Pressable>
                        </View>
                      ) : (
                        <View>
                          <Text className="text-lg">{item.quantity}</Text>
                        </View>
                      )}
                    </View>
                    <View className="flex-row justify-end mt-2">
                      <Text>Rs. {item.quantity * item.price}</Text>
                    </View>
                  </View>
                </View>

                <Pressable
                  onPress={() => clearData(item)}
                  item={item}
                  className="absolute top-2 right-2"
                >
                  <Icons name="close" size={20} />
                </Pressable>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* Order Summary at Bottom */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTitle}>Sub total</Text>

          <Text className="font-bold text-lg text-[#1e40af]">
            Rs. {subtotal}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => hasEmail ? router.push("checkout") : router.push("/profile/login")}
          >
          <Text style={styles.buyButtonText}>BUY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  cartContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cartItem: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: "#888",
  },

  productsTitle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

  billingFormContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  billingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  summaryContainer: {
    backgroundColor: "#f8f8f8",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  totalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#1e40af",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    // paddingVertical: 24,
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//   },
//   productsContainer: {
//     backgroundColor: '#f8f8f8',
//     borderRadius: 12,
//     padding: 16,
//   },
//   productItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   imageContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginRight: 12,
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//   },
//   productDetails: {
//     flex: 1,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   productInfo: {
//     flex: 1,
//   },
//   productTitle: {
//     fontSize: 14,
//     marginBottom: 4,
//     color: '#333',
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1e40af',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   quantityButton: {
//     padding: 6,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },
//   quantityButtonText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   quantityInput: {
//     width: 40,
//     textAlign: 'center',
//     fontSize: 16,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 4,
//   },
//   deleteButton: {
//     backgroundColor: '#f0f0f0',
//     padding: 6,
//     borderRadius: 50,
//   },
//   deleteIcon: {
//     fontSize: 20,
//     color: '#e60000',
//   },
//   billingFormContainer: {
//     backgroundColor: '#f8f8f8',
//     borderRadius: 12,
//     padding: 16,
//     marginTop: 24,
//   },
//   billingTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     borderColor: '#ddd',
//     borderWidth: 1,
//   },
//   summaryContainer: {
//     backgroundColor: '#f8f8f8',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     padding: 16,
//     paddingBottom: 24,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     color: '#333',
//   },
//   summaryValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#1e40af',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ddd',
//     marginVertical: 8,
//   },
//   totalTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   buyButton: {
//     backgroundColor: '#1e40af',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buyButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

export default cart;
