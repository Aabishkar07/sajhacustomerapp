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
import { clearCart, getCart } from "@/context/func";
import { Dropdown } from 'react-native-element-dropdown';
import axios from "axios";
import { BaseUrl } from "../baseurl/baseurl";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";

const Checkout = ({deliveryValue}) => {
  const auth = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [value, setValue] = useState(null);

  const [billingAddress, setBillingAddress] = useState({
    name: "",
    email: "",
    address: "",
    phonenumber: "",
  });

  const handleBillingChange = (field, value) => {
    setBillingAddress({ ...billingAddress, [field]: value });
  };

  useEffect(() => {
    loadCartItems();
  }, [auth]); 
 

  const loadCartItems = async () => {
    const cart = await getCart();
    setCartItems(cart);
  };

  const clearAll = () => {
    clearCart();
    auth.loadCart();
    // toastRef.current.show("Removed item from cart successfully", 3000);
  };

  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  var shippingFee = 0;
  if(value)
  {
    shippingFee = value.price;
  }
  const total = subtotal + shippingFee ;
  const paymentmethod="cash-on-delivery"
  const handleformsubmit=async()=>{
    console.log("billingAddress",cartItems);

    const alltotal={
      "paymentmethod":paymentmethod,
      "order_from":value.id,
      "total":total,
    }
    const orderData={
     "billingAddress": billingAddress,
      "alltotal":alltotal,
      "cartItems": cartItems
    }
    try {
      
      const response = await axios.post(`${BaseUrl}checkout`,orderData);
      console.log('Success:', response.status);
      if (response.status === 200) {
        clearAll();
        router.push("/homepage")
       
      }
  } catch (error) {
      console.error('Error:', error);
  }
   
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        className="mt-4"
        contentContainerStyle={styles.scrollContainer}
      >

<Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={deliveryValue} // Data for the dropdown
      search
      maxHeight={300}
      labelField="location" // This is the field shown in the dropdown
      valueField="price"    // This is the value field (used for the `value` state)
      placeholder="Select Delivery Location"
      searchPlaceholder="Search Location..."
      value={value} // Current selected value
      onChange={item => {
        setValue({ id: item.id,label: item.location, price: item.price }); // Set both label and price in the value state
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />


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
            placeholder="Email"
            value={billingAddress.email}
            onChangeText={(text) => handleBillingChange("email", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={billingAddress.address}
            onChangeText={(text) => handleBillingChange("address", text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Phonenumber"
            value={billingAddress.phonenumber}
            onChangeText={(text) => handleBillingChange("phonenumber", text)}
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
      {deliveryValue ? (
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
          <Text style={styles.totalTitle}>Total</Text>
          <Text style={styles.summaryValue}>Rs. {total}</Text>
        </View>
        <TouchableOpacity onPress={()=>handleformsubmit()} style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>

    ) : (
        <Text>Loading...</Text>
      )}
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

  // Dropdown style 
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

});
export default Checkout;
