import Header from "@/components/layouts/Header";
import Product from "@/components/products/product";
import Toast from "react-native-easy-toast";
import React, { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import { View, Text, ScrollView, StyleSheet, TextInput, SafeAreaView } from "react-native";
import { addCart } from "@/context/func";
import { AuthContext } from "@/context/context";
import axios from "axios";
import { BaseUrl } from "@/components/baseurl/baseurl";

const Explore = () => {
  const toastRef = React.createRef();
  const auth = useContext(AuthContext);
  const [allProduct, setProductData] = useState([]); 

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}buyandsell`);
      console.log("Fetched data:", response.data); 
      setProductData(response.data.data || []); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setProductData([]); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCart = async (product) => {
    try {
      await addCart(
        product.id,
        product.product_name,
        product.product_price - product.discount_amount,
        1,
        product.full_image_path
      );
      auth.loadCart();
      toastRef.current.show("Added to cart successfully", 3000);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const toastStyles = StyleSheet.create({
    container: {
      backgroundColor: "#366735",
      // Add any additional styling for the toast here
    },
  });

  const handleProductPress = (product) => {
    router.push({
      pathname: "/productdetails/[index]",
      params: { id: product.id },
    });
  };

  return (
    <View className="bg-white pb-28">
      <Header />
      <ScrollView>
        <SafeAreaView>
          <Toast
            ref={toastRef}
            position="top"
            style={toastStyles.container} // Style for the toast
          />
          {/* <View>
            <TextInput
              placeholder="search..."
              className="border-salte-200 border-[0.5px] mx-4 my-2 rounded-xl px-5"
              style={{ height: 50, backgroundColor: "white" }}
            />
          </View> */}

          <View>
            <View className="h-full pt-10 bg-white">
              <View>
                <Text className="text-2xl mx-3 text-[#ec4c15]">
                  BuyandSell
                </Text>

                {/* Conditional rendering to avoid errors */}
                <View style={styles.gridContainer}>
                  {Array.isArray(allProduct) && allProduct.length > 0 ? (
                    allProduct.map((product, index) => (
                      <View className="w-[50%]" key={index}>
                        <Product
                          product={product}
                          onPressCart={() => handleCart(product)}
                          onPress={() => handleProductPress(product)}
                        />
                      </View>
                    ))
                  ) : (
                    <Text>No products available</Text> // Optional: Message for empty state
                  )}
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
