import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../layouts/Header";
import { AuthContext } from "@/context/context";
import { getCart } from "@/context/func";
import { router } from "expo-router";

const Checkout = () => {
  const auth = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const [billingAddress, setBillingAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleBillingChange = (field, value) => {
    setBillingAddress({ ...billingAddress, [field]: value });
  };

  useEffect(() => {
    loadCartItems();
  }, [auth]); // Now listening for changes in auth, not cartItems

  const loadCartItems = async () => {
    const cart = await getCart();
    setCartItems(cart);
  };

  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const shippingFee = 0;
  const tax = 0;
  const total = subtotal + shippingFee + tax;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        className="mt-4"
        contentContainerStyle={styles.scrollContainer}
      >
        {/* <View>
          <Text>checkout</Text>
        </View> */}

        <View>
          <Text style={styles.billingTitle}>Billing Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={billingAddress.name}
            onChangeText={(text) => handleBillingChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={billingAddress.address}
            onChangeText={(text) => handleBillingChange("address", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={billingAddress.city}
            onChangeText={(text) => handleBillingChange("city", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={billingAddress.state}
            onChangeText={(text) => handleBillingChange("state", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ZIP Code"
            value={billingAddress.zip}
            onChangeText={(text) => handleBillingChange("zip", text)}
          />
        </View>

        <View>
          <View>
            <Text>Payment Method</Text>
          </View>
          <View className="mb-4 ">
            <ImageBackground
              className="object-contain w-64 h-24 mt-1"
              source={require("../../assets/images/cashondelivery.png")}
            />
          </View>
        </View>
      </ScrollView>

      {/* Order Summary at Bottom */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Sub total</Text>
          <Text style={styles.summaryValue}>Rs. {subtotal}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping Fee</Text>
          <Text style={styles.summaryValue}>Rs. {shippingFee}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>Rs. {tax}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalTitle}>Total</Text>
          <Text style={styles.summaryValue}>Rs. {total}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
  summaryValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e40af",
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
export default Checkout;
