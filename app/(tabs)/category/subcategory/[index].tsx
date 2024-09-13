import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { BaseUrl } from "@/components/baseurl/baseurl";
import Category from "@/components/category";
import Header from "@/components/layouts/Header";

const index = () => {
  const { id } = useLocalSearchParams();
  console.log("myidcat", id);
  const [categories, setCategory] = useState();
  const [renderApp, setRenderApp] = useState(false);
  const [catName, setCatName] = useState();

  const loadData = async (catid) => {
    const response = await axios.get(`${BaseUrl}subcategory/${catid}`);
    // console.log(response.data);
    setCategory(response.data.categories);
    setCatName(response.data.categoryname);

    setRenderApp(true);
  };
  // console.log(response.data.products);

  useEffect(() => {
    loadData(id);
  }, []);
  return (
    <View>
      <Header />
      <ScrollView className="pt-4">
        {renderApp ? (
          <View className="px-4">
            <View className="flex-row gap-3">
              <Text className="text-lg text-orange-600">Category : </Text>
              <Text className="text-lg font-semibold text-blue-600">
                {catName ? catName : "No category"}
              </Text>
            </View>
            <View className="flex-row flex-wrap mt-4 gap-x-2">
              {categories.map((category, index) => {
                return (
                  <View className="w-[20%]">
                    <Category category={category} key={index} />
                  </View>
                );
              })}
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
