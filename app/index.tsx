import { Link } from 'expo-router'
import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
 
  return (
    <SafeAreaView className="top-[10%] ">

    
 
    <View className="items-center ">
        <ImageBackground className="object-contain w-full h-24 mx-16 mt-1 "
         
            source={require("../assets/images/logo.png")}
        />
    </View>
    <View className="mt-[15%]">

    <View className="">
        <Text className="text-center text-[#0066ff] text-[25px] font-extrabold" > Welcome To Sajha Market Place
           </Text>

        {/* <Text className="text-center text-[#202544]  text-[30px] font-medium">Book</Text> */}
    </View>
    <View className="mt-[15%]">
        <Text className="text-center text-[#fe6700] text-[25px] font-extrabold" >Your Digital Marketplace for All Things Awesome!</Text>
    </View>

    <View className="items-center mt-[70%]">
        <Link href="/profile" asChild>
        <TouchableOpacity className="bg-[#fe6700]  text-center  w-[75%] flex gap-2 items-center rounded-md" >
            <Text className="p-2 mb-1 text-lg text-white">
                Get Started
            </Text>
        </TouchableOpacity>
        </Link>
        
    </View>

   

</View>
    </SafeAreaView>
  )
}

export default index
