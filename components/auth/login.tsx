import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Key from "react-native-vector-icons/FontAwesome5";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "../baseurl/baseurl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    if (!email) {
      Alert.alert("Validation Error", "Email is required");
      return;
    }

    if (!password) {
      Alert.alert("Validation Error", "Password is required");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      axios.get(`${BaseUrl}customer/checkauth`)
      const response = await axios.post(
        `${BaseUrl}customer/checkauth`,
        data
      );

      if (response.status === 200) {
        Alert.alert("Success", "You have successfully loggedin");
        
        const email = response.data.email;
      console.log(email, "asdas");

        AsyncStorage.setItem("userEmail", email);  
        
        const storedEmail =  AsyncStorage.getItem('userEmail');
console.log(storedEmail,"hhh");
        
        router.push('/profile')

      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        Alert.alert("Error", "Endpoint not found");
      } else {
        Alert.alert("Error", `Username or password is incorrect`);
      }
    }
  };

  return (
    <ScrollView className="h-full bg-white">
      <SafeAreaView>
        <View className="w-full h-full ">
          <View className="relative ">
            <View className="">
              <ImageBackground
                className="object-contain w-full h-56 "
                source={require("../../assets/images/signup.jpg")}
              />
            </View>
            <View className="absolute top-[30%] left-8">
              <View>
                <Text className="text-[30px] text-white  font-bold">
                  Welcome
                </Text>
              </View>
              <View>
                <Text className=" text-[30px] text-white  font-bold">Back</Text>
              </View>
              <View className="mt-5">
                <Text className=" text-[15px]  text-white  font-bold">
                  Sign in to continue ...
                </Text>
              </View>
            </View>
          </View>

          <View className="px-8 pt-5">
            {/* email  */}
            <View className="flex-row items-center w-full my-5 border border-gray-300 rounded-lg bg-gray-50">
              <View className="p-2 border-r border-r-[#0F6FFF]">
                <Icon name="email" size={30} color="#0F6FFF" />
              </View>
              <View className="w-full ">
                <TextInput
                  className=" text-[#202544] sm:text-sm  block p-2.5 "
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Enter Your email"
                  keyboardType="email-address"
                  // keyboardType="numeric"
                />
              </View>
            </View>
            {/* password  */}
            <View className="flex-row items-center w-full border border-gray-300 rounded-lg bg-gray-50">
              <View className="p-2 border-r border-r-[#0F6FFF]">
                <Key name="key" size={30} color="#0F6FFF" />
              </View>
              <View className="w-full ">
                <TextInput
                  className=" text-[#202544] sm:text-sm  block p-2.5 "
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Enter Your Password"
                  secureTextEntry

                  // keyboardType="numeric"
                />
              </View>
            </View>
            {/* forgot password  */}
            <View className="my-3 mb-9">
              <TouchableOpacity>
                <Text className="text-[#202544] text-lg text-right">
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="w-full duration-150 "
              onPress={onSubmit}
            >
              <Text className="bg-[#0F6FFF] mb-5 text-white text-center p-3 text-lg flex gap-2 rounded-lg">
                Login
              </Text>
            </TouchableOpacity>

            {/* <View className="my-3">
              <View>
                <Text className="inset-x-0 px-2 mx-auto mb-5 text-sm text-center w-fit bg-red">
                  Or continue with
                </Text>
              </View>

              <View className="flex-row justify-between w-full ">
                <View className="w-[48%] mr-1">
                  <TouchableOpacity className="w-full  py-1.5 border rounded-lg duration-150 ">
                    <Text className="text-[#0F6FFF] text-center text-lg p-2 mb-1">
                      Google
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="w-[48%]">
                  <TouchableOpacity className="w-full py-1.5 border rounded-lg duration-150 ">
                    <Text className="text-[#0F6FFF] text-center text-lg p-2 mb-1">
                      Facebook
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View> */}
          </View>

          <View className="px-8">
            <View>
              <Text className="text-center">Dont't have an account ? </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/profile/signup");
                }}
              >
                <Text className="text-center underline text-lg text-[#0F6FFF]">
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
