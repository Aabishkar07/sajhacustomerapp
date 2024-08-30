import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
// import { HeartIcon } from 'react-native-heroicons/solid'

export default function Category({ category }) {
  // console.log("hiii",category)
  return (
    <View className="mx-1 overflow-hidden w-[95px] ">
      {/* <View className="flex-row justify-center" style={{boxShadow: '0px 120px 100px -40px rgba(0, 0, 0, 1)'}}> */}
      <View className="flex-row justify-center overflow-hidden rounded-full">
        <Image
          // source={{ uri: category.image }}
          source={{ uri: "https://imagepasal.com/watermark/IMG_9980-image-pasal-2023-09-11.jpg" }}
          className="w-16 h-16 rounded-full"
        />
      </View>

      <View className="p-1">
        <Text className="font-semibold text-[14px] text-center text-[#ec4c15] shadow">
          {category.category_name}
        </Text>
        {/* <Text className="text-lg text-gray-600 shadow ">$ {people.price}</Text> */}
      </View>
    </View>
  );
}
