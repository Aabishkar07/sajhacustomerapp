import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import axios from "axios";
import { BaseUrl } from "./baseurl/baseurl";
// import { HeartIcon } from 'react-native-heroicons/solid'

export default function Category({ category }) {
  // console.log("hiii",category)

  const handlesubcategory=async(cat)=>{
    const response=await axios.get(`${BaseUrl}subcategory/${cat.id}`)
    // console.log(response.data.products);
    if(response.data.products)
    {
      // alert("product");
      router.push({
        pathname: "/category/products/[index]",
        params: { id: cat.id },
      });
    }
    if(response.data.categories)
    {
      // alert("categories");
      router.push({
        pathname: "/category/subcategory/[index]",
        params: { id: cat.id },
      });

      // router.push("/category/subcategory");
    }
  }

  return (
    <TouchableOpacity
      onPress={() => handlesubcategory(category)}
      className="mx-1 overflow-hidden w-[95px] "
    >
      {/* <View className="flex-row justify-center" style={{boxShadow: '0px 120px 100px -40px rgba(0, 0, 0, 1)'}}> */}
      <View className="flex-row justify-center overflow-hidden rounded-full">
        <Image
          source={{ uri: category.category_image }}
          className="w-16 h-16 rounded-full"
        />
      </View>

      <View className="p-1">
        <Text className="font-semibold text-[14px] text-center text-[#ec4c15] shadow">
          {category.category_name}
        </Text>
        {/* <Text className="text-lg text-gray-600 shadow ">$ {people.price}</Text> */}
      </View>
    </TouchableOpacity>
  );
}
