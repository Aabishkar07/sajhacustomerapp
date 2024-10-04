import Category from "@/components/category";
import Header from "@/components/layouts/Header";
import Product from "@/components/products/product";
import ImageSlider from "@/components/slider";
import Toast from "react-native-easy-toast";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  FlatList,
  Animated,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import productsData from "../../product.json";
import { addCart } from "@/context/func";
import { AuthContext } from "@/context/context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/components/baseurl/baseurl";

const Homepage = () => {
  // const baseurl=BaseUrl

  const toastRef = React.createRef();

  const auth = useContext(AuthContext);

  const [dataSource, setDataSource] = useState([]); 
  const [banner, setBanner] = useState([]); 
  const [allProduct, setProductData] = useState([]); 

  const fetchData = async () => {
    console.log("hello world!");
    try {
      const response = await Promise.all([
        axios.get(`${BaseUrl}category`),
        axios.get(`${BaseUrl}banner`),
        axios.get(`${BaseUrl}homeproducts`)
      ]);
      const data = response[0].data;
      const banners = response[1].data;
      const productdata = response[2].data;
    
      setDataSource(data);
      setBanner(banners);
      setProductData(productdata.data);
      
    } catch (error) {
      console.error("Error fetchingddd data: ", error);
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
      // console.log(await AsyncStorage.getItem("cart"));
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
    console.log("Product pressed:", product.id);
    router.push({
      pathname: "/productdetails/[index]",
      params: { id: product.id },
    });
    // navigation.navigate("Single", { product });
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
          <View className="items-center">
            <ImageSlider  banners={banner}/>
          </View>
          <View>
            <View className="h-full pt-10 bg-white">
              <View className="">
                <View className="">
                  {/* category  */}
                  <View>
                    <View className="flex-row items-center justify-between mx-5">
                      <View className="">
                        <Text className="text-2xl text-[#ec4c15]">
                          Categories
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          className="flex-row gap-x-2"
                          onPress={() => {
                            router.push("/category");
                          }}
                        >
                          <Text className="text-[#0066ff] text-[16px]">
                            See all{" "}
                          </Text>
                          <AntDesign
                            name="arrowright"
                            size={24}
                            color="#0066ff"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* carousel */}
                    <View className="mx-1 mt-5 carousel">
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
                        {dataSource.map((category, index) => {
                          return <Category category={category} key={index} />;
                        })}
                        {/* 
                        {dataSource.map((item, index) => (
                          <View key={index}>
                            <Image
                              source={{ uri:"https://imagepasal.com/watermark/IMG_9980-image-pasal-2023-09-11.jpg" }}
                              style={styles.image}

                            />
                            <Text className="text-bl">
                              {item.category_name}
                            </Text>
                          </View>
                        ))} */}
                      </ScrollView>
                    </View>

                    <View className="flex-row flex-wrap justify-between">
                      {allProduct.map((product, index) => (
                        <View className="w-1/2" key={index}>
                          <Product
                            product={product}
                            // onPressCart={() => handleCart(product)}
                            onPress={() => handleProductPress(product)}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
