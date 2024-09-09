import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import  { useLocalSearchParams } from 'expo-router'
import Singleproductdetails from '@/components/products/singleproductdetails'
import Header from '@/components/layouts/Header'
import { BaseUrl } from '@/components/baseurl/baseurl'
import axios from 'axios'




const productdetails = () => {
  const { id } = useLocalSearchParams();

  const [productData, setProductData] = useState(null);
  const [productAttribute, setProductAttribute] = useState(null);
  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]); // Include id in dependency array to refetch if it changes

  const loadData = async (id) => {
    try {
      console.log("aabbbsss", id);
      const response = await axios.get(`${BaseUrl}productbyid/${id}`);
      setProductData(response.data.data.product);
      setProductAttribute(response.data.data.attribute);

      console.log(response.data.data.attribute, "akakaa");
      // loadAtttribute(response.data.data.attribute);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (

   <View className="pb-28">
      <Header/>
      <Singleproductdetails productData={productData} productAttribute={productAttribute} />
   </View>
   
   
  )
}

export default productdetails