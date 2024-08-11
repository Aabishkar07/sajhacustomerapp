import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import  { useLocalSearchParams } from 'expo-router'
import Singleproductdetails from '@/components/products/singleproductdetails'
import Header from '@/components/layouts/Header'




const productdetails = () => {

  return (

   <View className="pb-28">
<Header/>
     <Singleproductdetails />
   </View>
   
   
  )
}

export default productdetails