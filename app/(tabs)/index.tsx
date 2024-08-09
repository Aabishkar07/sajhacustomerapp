import Category from "@/components/category";
import Header from "@/components/layouts/Header";
import Product from "@/components/products/product";
import ImageSlider from "@/components/slider";
import React, { useState } from "react";
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

const Index = () => {
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

  return (
    <ScrollView>
    <SafeAreaView>
      <Header />
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
      <ScrollView>
        <View className="bg-white h-full pt-10">
          <View className="">
            <View className="">
              {/* category  */}
              <View>
                <View className="flex-row items-center justify-between mx-5">
                  <View className=" ">
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
                <View className="carousel mt-5 mx-1">
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {featuredcategorys.map((category, index) => {
                      return <Category category={category} key={index} />;
                    })}
                  </ScrollView>
                </View>

                <ScrollView contentContainerStyle={styles.gridContainer}>
                  {featuredproducts.map((product, index) => (
                    <Product product={product} key={index} />
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
