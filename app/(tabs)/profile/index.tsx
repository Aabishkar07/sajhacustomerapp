import Login from "@/components/auth/login";
import Header from "@/components/layouts/Header";
import React, { Component } from "react";
import { Text, View } from "react-native";
import {router} from 'expo-router';

export default class index extends Component {
  render() {
    return (
      <View>
        <Header />
        <View className="flex items-center justify-center text-center">

        
        <View >
         <Text className="text-xl text-[#fe6700]">Profile</Text>
        </View>
        <View>
         <Text className="text-2xl text-[#0066ff]" onPress={() => { router.push('/profile/login') }}>LogIn</Text>
        </View>
        </View>
      </View>
    );
  }
}
