import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Header from "../layouts/Header";
import { BaseUrl } from "../baseurl/baseurl";
import axios from "axios";
import { router } from "expo-router";
import Product from "../products/product";

const Searchbar = () => {
  const [filterData, setFilterData] = useState([]);
  const [allProduct, setProductData] = useState([]);
  const [renderApp, setRenderApp] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}products`);
      const productdata = response.data;
      // console.log("productdata",productdata.data)

      setProductData(productdata.data);
      setFilterData(productdata.data);
      setRenderApp(true);
    } catch (error) {
      console.error("Error fetchingddd data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (text) => {
    // Alert.alert("Input Value", text);
    if (text) {
      const newData = allProduct.filter((item) => {
        const itemDate = item.product_name
          ? item.product_name.toLowerCase()
          : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemDate.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(allProduct);
    }
  };

  const handleProductPress = (product) => {
    console.log("Product pressed:", product.id);
    router.push({
      pathname: "/productdetails/[index]",
      params: { id: product.id },
    });
  };

  return (
    <>
      <Header />
      <ScrollView>
        <SafeAreaView>
          {renderApp ? (
            <View>
              <TextInput
                placeholder="search..."
                onChangeText={handleInputChange}
                className="border-salte-200 border-[0.5px] mx-4 my-2 rounded-xl px-5"
                style={{ height: 50, backgroundColor: "white" }}
              />
              {filterData.length > 0 ? (
                <View className="flex-row flex-wrap justify-between">
                  {filterData.map((item, index) => (
                    <View className="w-1/2" key={index}>
                      <Product
                        product={item}
                        onPress={() => handleProductPress(item)}
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <View className="flex-row items-center justify-center pt-3 gap-x-3">
                  <Text>---</Text>
                  <Text className="font-semibold text-center text-orange-700">NO PRODUCT FOUND</Text>
                  <Text>---</Text>
                </View>
              )}
            </View>
          ) : (
            <View>
              <Text className="font-semibold text-center">Loading ...</Text>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default Searchbar;
