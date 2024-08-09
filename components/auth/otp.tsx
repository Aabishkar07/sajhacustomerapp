import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Key from "react-native-vector-icons/FontAwesome5";
import { router } from "expo-router";

export class otp extends Component {
  render() {
    return (
      <ScrollView className="flex-1 bg-white">
        <SafeAreaView className="flex-1 justify-center py-12">
          <View className=" px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <View className="mx-auto w-full max-w-md space-y-16">
              <View className="flex flex-col items-center justify-center text-center space-y-2">
                <Text className="font-semibold text-3xl">
                  Email Verification
                </Text>
                <Text className="text-sm font-medium text-gray-400">
                  We have sent a code to your email ba**@dipainhouse.com
                </Text>
              </View>

              <View>
                <TextInput
                
                  className=" text-[#202544] border border-gray-500 rounded-md  sm:text-sm  block p-2.5 "
                  // onChangeText={onChangeNumber}
                  // value={number}
                  placeholder="Enter Your otp"
                  keyboardType="email-address"
                  keyboardType="numeric"
                />

                <View className="mt-10 space-y-5">
                  <TouchableOpacity className="w-full py-5 bg-blue-700 rounded-xl shadow-sm flex items-center justify-center">
                    <Text className="text-white text-sm font-semibold">
                      Verify Account
                    </Text>
                  </TouchableOpacity>

                  <View className="flex flex-row items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                    <Text>Didn't receive code?</Text>
                    <TouchableOpacity>
                      <Text className="text-blue-600">Resend</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default otp;
