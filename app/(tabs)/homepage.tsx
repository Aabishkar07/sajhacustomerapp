import Category from "@/components/category";
import Header from "@/components/layouts/Header";
import Product from "@/components/products/product";
import ImageSlider from "@/components/slider";
import Toast from "react-native-easy-toast";

import React, { useContext, useState } from "react";
import {router} from 'expo-router';
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

const Homepage = () => {
  const toastRef = React.createRef();

  const auth=useContext(AuthContext)
  const featuredcategorys = [
    {
      name: "Australian Orange",
      price: "12.30",
      stars: 4,
      desc: "Sweet and juicy",
      shadow: "orange",
      image:
        "https://imagepasal.com/watermark/IMG_9980-image-pasal-2023-09-11.jpg",
      color: (opacity) => `rgba(251, 216, 146, ${opacity})`,
    },
    {
      name: "Flesh Nectari",
      shadow: "red",
      price: "12",
      stars: 3,
      desc: "Sweet and juicy",
      image:
        "https://buffer.com/library/content/images/2023/10/free-images.jpg",
      color: (opacity) => `rgba(255, 170, 157, ${opacity})`,
    },

    {
      name: "Black Grapes",
      price: "40",
      stars: 4,
      desc: "Sweet and juicy",
      shadow: "purple",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqHqVr-CbHrt6TbZXYpaO7TR1weVwUFpOoK7EWtnNG&s",
      color: (opacity) => `rgba(214, 195, 246, ${opacity})`,
    },

    {
      name: "Red Grapecategory",
      price: "30",
      stars: 4,
      desc: "Sweet and juicy",
      shadow: "red",
      image:
        "https://buffer.com/library/content/images/2023/10/free-images.jpg",
      color: (opacity) => `rgba(255, 163, 120, ${opacity})`,
    },
    {
      name: "Green Apple",
      price: "10.5",
      stars: 4,
      desc: "Sweet and juicy",
      shadow: "green",
      image:
        "https://imagepasal.com/watermark/IMG_9980-image-pasal-2023-09-11.jpg",
      color: (opacity) => `rgba(139, 243, 139, ${opacity})`,
    },
  ];

  const featuredproducts = [
    {
      title: "Product Title",
      description: "Product description goes here.",
      price: 99.99,
      image: "https://cdn.easyfrontend.com/pictures/products/couch3.png",
    },
    {
      title: "Product Title",
      description: "Product description goes here.",
      price: 99.99,
      image: "https://cdn.easyfrontend.com/pictures/products/couch3.png",
    },
  ];

  const handleCart = async (product) => {
    try {
      await addCart(
        product.id,
        product.name,
        product.price.toFixed(2)-product.discount_price,
        1,
        product.image_url
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
    router.push({pathname:'/productdetails/[index]',
      params :{id:product.id}
    })
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
        <View>
        <TextInput
          placeholder="search..."
          className="border-salte-200 border-[0.5px] mx-4 my-2 rounded-xl px-5"
          style={{ height: 50, backgroundColor: "white" }}
        />
      </View>
      <View className="items-center">
        <ImageSlider />
      </View>
      <View>
        <View className="h-full pt-10 bg-white">
          <View className="">
            <View className="">
              {/* category  */}
              <View>
                <View className="flex-row items-center justify-between mx-5">
                  <View className="">
                    <Text className="text-2xl text-[#ec4c15]">Categories</Text>
                  </View>
                  <View>
                  <TouchableOpacity onPress={()=>{
                        router.push('/allcategory')
                    }}>
                    <Text className="text-gray-600 text-[16px]">see all </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* carousel */}
                <View className="mx-1 mt-5 carousel">
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {featuredcategorys.map((category, index) => {
                      return <Category category={category} key={index} />;
                    })}
                  </ScrollView>
                </View>

                <View 
                style={styles.gridContainer}
                >
                    {productsData.map((product, index) => (
                    <View className="w-[50%]" key={index}>

                      <Product product={product} 
                     onPressCart={() => handleCart(product)}
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
    flex:1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
   
  },
});
