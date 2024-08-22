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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email || !password || !passwordConfirmation) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    const data = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const response = await axios.post(
        "http://192.168.0.100:8000/api/customer/signup",
        data
      );
      if (response.status === 201) {
        Alert.alert("Success", "You have successfully registered");
        AsyncStorage.setItem("user", JSON.stringify(data.email));

        router.push('/otpcheck'); 
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        Alert.alert("Error", "Endpoint not found");
      } else {
        Alert.alert("Error", `An error occurred: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <ScrollView>
        <SafeAreaView>
          <View className="h-full bg-white">
            <View className="relative">
              <View>
                <ImageBackground
                  className="object-contain w-full h-56"
                  source={require("../../assets/images/signup.jpg")}
                />
              </View>
              <View className="absolute top-[30%] left-8">
                <Text className="text-[30px] text-white font-bold">
                  Welcome
                </Text>
                <Text className="text-[30px] text-white font-bold">User</Text>
                <Text className="mt-5 text-[15px] text-white font-bold">
                  Create Your Account
                </Text>
              </View>
            </View>

            <View className="px-8">
              {/* Email Input */}
              <View className="flex-row items-center w-full my-5 border border-gray-300 rounded-lg bg-gray-50">
                <View className="p-2 border-r border-r-[#0F6FFF]">
                  <Icon name="email" size={30} color="#0F6FFF" />
                </View>
                <TextInput
                  className="w-full text-[#202544] sm:text-sm block p-2.5"
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Enter Your email"
                  keyboardType="email-address"
                />
              </View>

              {/* Password Input */}
              <View className="flex-row items-center w-full mb-5 border border-gray-300 rounded-lg bg-gray-50">
                <View className="p-2 border-r border-r-[#0F6FFF]">
                  <Key name="key" size={30} color="#0F6FFF" />
                </View>
                <TextInput
                  className="w-full text-[#202544] sm:text-sm block p-2.5"
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Enter Your Password"
                  secureTextEntry
                />
              </View>

              {/* Confirm Password Input */}
              <View className="flex-row items-center w-full border border-gray-300 rounded-lg mb-9 bg-gray-50">
                <View className="p-2 border-r border-r-[#0F6FFF]">
                  <Key name="key" size={30} color="#0F6FFF" />
                </View>
                <TextInput
                  className="w-full text-[#202544] sm:text-sm block p-2.5"
                  onChangeText={setPasswordConfirmation}
                  value={passwordConfirmation}
                  placeholder="Confirm Your Password"
                  secureTextEntry
                />
              </View>

              {/* Signup Button */}
              <TouchableOpacity
                onPress={onSubmit}
                disabled={loading}
                className="w-full duration-150"
              >
                <Text className="bg-[#0F6FFF] mb-5 text-white text-center p-3 text-lg flex gap-2 rounded-lg">
                  {loading ? "Signing Up..." : "Signup"}
                </Text>
              </TouchableOpacity>

              {/* Continue with Google/Facebook */}
              <View>
                <Text className="inset-x-0 px-2 mx-auto mb-5 text-sm text-center">
                  Or continue with
                </Text>
                <View className="flex-row justify-between w-full">
                  <TouchableOpacity className="w-[48%] py-1.5 border rounded-lg duration-150">
                    <Text className="text-[#0F6FFF] text-center text-lg p-2 mb-1">
                      Google
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="w-[48%] py-1.5 border rounded-lg duration-150">
                    <Text className="text-[#0F6FFF] text-center text-lg p-2 mb-1">
                      Facebook
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Redirect */}
              <View className="px-8 my-5">
                <Text className="text-center">Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/profile/login")}>
                  <Text className="text-center underline text-lg text-[#0F6FFF]">
                    Login
                  </Text>
                </TouchableOpacity>

            

              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Signup;
