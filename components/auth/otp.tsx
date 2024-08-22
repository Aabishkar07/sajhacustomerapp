import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Key from "react-native-vector-icons/FontAwesome5";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const otp = () => {
  const [otp, setotp] = useState();

  const onSubmit = async () => {

    if (!otp) {
      Alert.alert("Validation Error", "OTP is required");
      return;
    }

    const data = {
      otp: otp,
    };

    try {
      
      const useremail = await AsyncStorage.getItem("user");
      const email = JSON.parse(useremail);

      const response = await axios.post(
        `http://192.168.0.100:8000/api/customer/checkotp/${email}`,
        data
      );

      if (response.status === 200) {
        Alert.alert("Success", "OTP matched successfully");
        router.push('/profile/login');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        Alert.alert("Error", "Endpoint not found");
      } else {
        Alert.alert("Error", `OTP Incorrect , An error occurred: ${err.message}`);
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <SafeAreaView className="flex-1 justify-center py-12">
        <View className=" px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <View className="mx-auto w-full max-w-md space-y-16">
            <View className="flex flex-col items-center justify-center text-center space-y-2">
              <Text className="font-semibold text-3xl">Email Verification</Text>
              <Text className="text-sm font-medium text-gray-400">
                We have sent a code to your email ba**@dipainhouse.com
              </Text>
            </View>

            <View>
              <TextInput
                className=" text-[#202544] border border-gray-500 rounded-md  sm:text-sm  block p-2.5 "
                onChangeText={setotp}
                value={otp}
                placeholder="Enter Your otp"
                keyboardType="email-address"
                keyboardType="numeric"
                required
              />

              <View className="mt-10 space-y-5">
                <TouchableOpacity
                  onPress={onSubmit}
                  className="w-full py-5 bg-blue-700 rounded-xl shadow-sm flex items-center justify-center"
                >
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
};

export default otp;
