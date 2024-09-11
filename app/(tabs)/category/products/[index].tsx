import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { BaseUrl } from "@/components/baseurl/baseurl";
import Category from "@/components/category";
import Header from "@/components/layouts/Header";
import Product from "@/components/products/product";

const index = () => {
  const { id } = useLocalSearchParams();
  console.log("myidcat", id);
  const [allProduct, setProducts] = useState();
  const [catName, setCatName] = useState();
  const [renderApp, setRenderApp] = useState(false);

  const loadData = async (catid) => {
    const response = await axios.get(`${BaseUrl}subcategory/${catid}`);
    // console.log(response.data);
    setProducts(response.data.products);
    setCatName(response.data.categoryname);
    setRenderApp(true);
  };

  const handleProductPress = (product) => {
    console.log("Product pressed:", product.id);
    router.push({
      pathname: "/productdetails/[index]",
      params: { id: product.id },
    });
    // navigation.navigate("Single", { product });
  };

  useEffect(() => {
    loadData(id);
  }, []);

  return (
    <View>
      <Header />
      <ScrollView className="pt-4">
      {renderApp ? (
  <View className="px-4">
    <View className="flex-row gap-2">
      <Text className="text-lg text-orange-600">Category : </Text>
      <Text className="text-lg font-semibold text-blue-600">
        {catName  ? catName : 'No category'}
      </Text>
    </View>
    <View style={styles.gridContainer}>
      {allProduct && allProduct.length > 0 ? (
        allProduct.map((product, index) => (
          <View className="w-[50%]" key={index}>
            <Product product={product} onPress={() => handleProductPress(product)} />
          </View>
        ))
      ) : (
        <Text>No product found</Text>
      )}
    </View>
  </View>
) : (
  <View>
    <Text>Loading...</Text>
  </View>
)}

      </ScrollView>
    </View>
  );
};

export default index;
const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
